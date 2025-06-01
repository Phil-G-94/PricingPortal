import { validationResult } from "express-validator";
import { fetchComponents } from "../database/components.js";
import { Pod } from "../models/pod.js";
import { User } from "../models/user.js";
import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

const getComponents = async (req, res, next) => {
    try {
        const loadedComponents = await fetchComponents();
        let components;
        let baseComponents = [];
        let resourceComponents = [];

        loadedComponents.map((component) => {
            if (
                component.type === "chassis" ||
                component.type === "motherboard" ||
                component.type === "islc" ||
                component.type === "cooling and cabling"
            ) {
                baseComponents.push(component);
            } else if (
                component.type === "GPU" ||
                component.type === "CPU" ||
                component.type === "RAM" ||
                component.type === "SSD"
            ) {
                resourceComponents.push(component);
            }
        });

        components = {
            baseComponents,
            resourceComponents,
        };

        if (components.length === 0) {
            const error = new Error();
            error.message = "Could not fetch components from the database.";
            error.statusCode = 500;
            return next(error);
        }

        console.log(components);

        res.status(200).json({
            message: "Successful fetch.",
            components,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

const postComponents = async (req, res, next) => {
    const dateNow = new Date().toLocaleDateString();

    const errorResult = validationResult(req);

    const db = await getDb();

    const {
        chassis,
        motherboard,
        coolingCabling,
        islc,
        CPU,
        GPU,
        GPU_quantity,
        RAM,
        RAM_quantity,
        SSD,
        SSD_quantity,
    } = req.body;

    // selected cmp ID array
    const selectedCmpIds = [
        chassis,
        motherboard,
        coolingCabling,
        islc,
        CPU,
        GPU,
        GPU_quantity,
        RAM,
        RAM_quantity,
        SSD,
        SSD_quantity,
    ]
        .filter(Boolean)
        .map((id) =>
            ObjectId.isValid(id) ? ObjectId.createFromHexString(id) : null
        )
        .filter(Boolean);

    // fetch selected cmps from DB (by id)
    const selectedCmps = await db
        .collection("components")
        .find({ _id: { $in: selectedCmpIds } })
        .toArray();

    // transform array of cmp objects into 2D array
    const extractCmpInfo = ({ ids, quantities, selectedCmps }) => {
        return Object.entries(ids).map(([key, id]) => {
            const quantity = quantities?.[key] ?? 1; // nullish coalescing - return 11 if !quantities

            const component = selectedCmps.find((cmp) => cmp._id.toString() === id);

            console.log(component);

            return [
                key,
                {
                    name: component?.name,
                    cost: component?.cost * quantity,
                    quantity,
                },
            ];
        });
    };

    // sum up all component costs
    const sumCmpCosts = (components) => {
        return components.reduce((total, [, { cost }]) => {
            return total + cost;
        }, 0);
    };

    // grasp pod spec
    const spec = {
        baseComponents: extractCmpInfo({
            ids: { chassis, motherboard, coolingCabling, islc },
            selectedCmps,
        }),

        resourceComponents: extractCmpInfo({
            ids: { CPU, GPU, RAM, SSD },
            quantities: {
                GPU: +GPU_quantity || 1,
                RAM: +RAM_quantity || 1,
                SSD: +SSD_quantity || 1,
            },
            selectedCmps,
        }),
    };

    // cost and price calcs
    const baseCmpCost = sumCmpCosts(spec.baseComponents);
    const resourceCmpCost = sumCmpCosts(spec.resourceComponents);
    const margin = 3500;
    const resellerFee = 1000;
    const resellerPrice = baseCmpCost + resourceCmpCost + margin;
    const retailPrice = baseCmpCost + resourceCmpCost + (resellerFee + margin);

    // validation
    const user = await User.findUserById(req.userId);

    if (!user) {
        throw new Error("User does not exist.");
    }

    if (!errorResult.isEmpty()) {
        const error = new Error("Validation failed. Please check your input values");
        error.statusCode = 422;
        error.message = errorResult.array();
    }

    // save pod spec to db
    try {
        const pod = new Pod({
            spec,
            resellerPrice,
            retailPrice,
            user,
            createdAt: dateNow,
        });

        await pod.save();

        res.status(200).json({
            message: "Successful post",
            spec,
            resellerPrice,
            retailPrice,
            errors: errorResult.array(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

export { getComponents, postComponents };
