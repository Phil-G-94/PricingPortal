import { validationResult } from "express-validator";
import { fetchComponents } from "../database/components.js";
import { Pod } from "../model/pod.js";
import { User } from "../model/user.js";

const getComponents = async (req, res, next) => {
    try {
        const components = await fetchComponents();

        if (components.length === 0) {
            const error = new Error();
            error.message =
                "Could not fetch components from the database.";
            error.statusCode = 500;
            return next(error);
        }

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
    const dateNow = new Date();

    const errorResult = validationResult(req);

    const ramQuantity = +req.body["RAM_quantity"];

    const ssdQuantity = +req.body["SSD_quantity"];

    const parseComponent = (data, quantity = 1) => {
        const [name, cost] = data?.split(" : ") || ["", "0"];
        return { name, cost: +cost * quantity };
    };

    const chassis = parseComponent(req.body.chassis);
    const motherboard = parseComponent(req.body.motherboard);
    const coolingCabling = parseComponent(req.body.coolingCabling);
    const islc = parseComponent(req.body.islc);
    const CPU = parseComponent(req.body.CPU);
    const GPU = parseComponent(req.body.GPU);
    const RAM = parseComponent(req.body.RAM, ramQuantity);
    const SSD = parseComponent(req.body.SSD, ssdQuantity);

    const spec = {
        baseComponents: {
            chassis,
            motherboard,
            coolingCabling,
            islc,
        },
        resourceComponents: {
            CPU,
            GPU,
            RAM,
            SSD,
        },
    };

    const costSorter = (dataObject) => {
        const costData = [];

        for (const c of Object.values(dataObject)) {
            costData.push(c.cost);
        }

        return costData;
    };

    const baseComponentCost = costSorter(spec.baseComponents).reduce(
        (partialSum, accumulator) => partialSum + accumulator,
        0
    );

    const resourceComponentCost =
        spec.resourceComponents.CPU.cost +
        7 * spec.resourceComponents.GPU.cost +
        spec.resourceComponents.RAM.cost +
        spec.resourceComponents.SSD.cost;

    const margin = 3500;

    const totalResellerPrice =
        baseComponentCost + resourceComponentCost + margin;
    const totalRetailPrice =
        baseComponentCost + resourceComponentCost + (1000 + margin);

    const user = await User.findUserById(req.userId);

    if (!user) {
        throw new Error("User does not exist.");
    }

    if (!errorResult.isEmpty()) {
        const error = new Error(
            "Validation failed. Please check your input values"
        );
        error.statusCode = 422;
        error.message = errorResult.array();
    }

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
            totalResellerPrice,
            totalRetailPrice,
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
