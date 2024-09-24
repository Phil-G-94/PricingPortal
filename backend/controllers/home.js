import { getDb } from "../database/connection.js";

const fetchComponents = async () => {
    const db = await getDb();

    const components = await db
        .collection("components")
        .find()
        .toArray();

    try {
        return components;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }

};

const getComponents = async (req, res, next) => {
    try {

        const components = await fetchComponents();

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

const postComponents = (req, res, next) => {

    const ramQuantity = req.body["RAM_quantity"];
    const ssdQuantity = req.body["SSD_quantity"];

    const chassis = {
        name: req.body.chassis?.split(" : ")[0],
        cost: +req.body.chassis?.split(" : ")[1]
    };

    const motherboard = {
        name: req.body.motherboard?.split(" : ")[0],
        cost: +req.body.motherboard?.split(" : ")[1],
    };

    const coolingCabling = {
        name: req.body.coolingCabling?.split(" : ")[0],
        cost: +req.body.coolingCabling?.split(" : ")[1],
    };

    const islc = {
        name: req.body.islc?.split(" : ")[0],
        cost: +req.body.islc?.split(" : ")[1],
    };

    const CPU = {
        name: req.body.CPU?.split(" : ")[0],
        cost: +req.body.CPU?.split(" : ")[1],
    };

    const GPU = {
        name: req.body.GPU?.split(" : ")[0],
        cost: +req.body.GPU?.split(" : ")[1],
    };

    const RAM = {
        name: req.body.RAM?.split(" : ")[0],
        cost: +req.body.RAM?.split(" : ")[1] * ramQuantity,
    };

    const SSD = {
        name: req.body.SSD?.split(" : ")[0],
        cost: +req.body.SSD?.split(" : ")[1] * ssdQuantity,
    };

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
        }

    };

    const costSorter = (dataObject) => {
        const costData = [];

        for (const c of Object.values(dataObject)) {
            costData.push(c.cost);
        }

        return costData;
    };

    const baseComponentCost = costSorter(spec.baseComponents).reduce((partialSum, accumulator) => partialSum + accumulator, 0);

    const resourceComponentCost = spec.resourceComponents.CPU.cost + (7 * spec.resourceComponents.GPU.cost) + (spec.resourceComponents.RAM.cost) + (spec.resourceComponents.SSD.cost);

    const margin = 3500;

    const totalResellerPrice = (baseComponentCost + resourceComponentCost) + margin;
    const totalRetailPrice = (baseComponentCost + resourceComponentCost) + (1000 + margin);

    res.status(200).json({
        message: "Successful post",
        spec,
        totalResellerPrice,
        totalRetailPrice
    });

};

export { getComponents, postComponents };