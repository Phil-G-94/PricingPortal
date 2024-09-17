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

    const spec = {
        baseComponents: {
            chassis: +req.body.chassis,
            motherboard: +req.body.motherboard,
            coolingCabling: +req.body.coolingCabling,
            islc: +req.body.islc,
        },
        resourceComponents: {
            CPU: +req.body.CPU,
            GPU: +req.body.GPU,
            RAM: +req.body.RAM,
            SSD: +req.body.SSD,
        }

    };

    const baseComponentCost = Object.values(spec.baseComponents).reduce((partialSum, accumulator) => partialSum + accumulator, 0);
    const resourceComponentCost = spec.resourceComponents.CPU + (7 * spec.resourceComponents.GPU) + (4 * spec.resourceComponents.RAM) + (3 * spec.resourceComponents.SSD);
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