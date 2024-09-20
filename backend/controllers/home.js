import { getDb } from "../database/connection.js";

const fetchComponents = () => {
    const db = getDb();

    return db
        .collection("components")
        .find()
        .toArray()
        .then(cmps => cmps)
        .catch(err => console.log(err));
};

const getComponents = (req, res, next) => {

    fetchComponents()
        .then(components => {

            res.status(200).json({
                message: "Successful fetch.",
                components,
            });
        })
        .catch(err => console.log(err));
};

const postComponents = (req, res, next) => {

    const ramQuantity = req.body["RAM_quantity"];
    const ssdQuantity = req.body["SSD_quantity"];

    const chassisCost = +req.body.chassis?.split(" : ")[1];
    const motherboardCost = +req.body.motherboard?.split(" : ")[1];
    const coolingCablingCost = +req.body.coolingCabling?.split(" : ")[1];
    const islcCost = +req.body.islc?.split(" : ")[1];
    const cpuCost = +req.body.CPU?.split(" : ")[1];
    const gpuCost = +req.body.GPU?.split(" : ")[1];
    const ramCost = +req.body.RAM?.split(" : ")[1];
    const ssdCost = +req.body.SSD?.split(" : ")[1];

    /* WIP: coolingCabling and islc showing undefined */

    const spec = {
        baseComponents: {
            chassis: chassisCost,
            motherboard: motherboardCost,
            coolingCabling: coolingCablingCost,
            islc: islcCost,
        },
        resourceComponents: {
            CPU: cpuCost,
            GPU: gpuCost,
            RAM: ramCost * ramQuantity,
            SSD: ssdCost * ssdQuantity,
        }

    };

    console.log(spec);

    const baseComponentCost = Object.values(spec.baseComponents).reduce((partialSum, accumulator) => partialSum + accumulator, 0);
    const resourceComponentCost = spec.resourceComponents.CPU + (7 * spec.resourceComponents.GPU) + (spec.resourceComponents.RAM) + (spec.resourceComponents.SSD);
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