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

    // input values received as strings, coerce to number;
    // const spec = {
    //     baseComponents: {
    //         chassis: +req.body.chassis,
    //         motherboard: +req.body.motherboard,
    //         islc: +req.body.islc,
    //         cooling_cabling: +req.body["cooling_cabling"],
    //         cpu: +req.body.cpu,
    //     },
    //     resourceComponents: {
    //         gpu: +req.body.gpu,
    //         ram: +req.body.ram,
    //         ssd: +req.body.ssd
    //     }
    // };

    // so that we can formulate totals for base components and resource components, respectively
    // then add those up and pass the information to our view to be displayed
    // const baseComponentCost = Object.values(spec.baseComponents).reduce((partialSum, a) => partialSum + a, 0);
    // const resourceComponentCost = (4 * spec.resourceComponents.ram) + (3 * spec.resourceComponents.ssd) + (7 * spec.resourceComponents.gpu);
    // const margin = 3500;

    // const totalRetailCost = (baseComponentCost + resourceComponentCost) + (1000 + margin);
    // const totalResellerCost = (baseComponentCost + resourceComponentCost) + margin;

    // fetchComponents()
    //     .then(components => {
    //         return res.status(200).json({
    //             message: "Successful post",
    //             components

    //         });
    //     })
    //     .catch(err => console.log(err));

    console.log(req.body);

    res.status(200).json({
        message: "Successful post",
        spec: {
            chassis: req.body.chassis,
        }

    });

};

export { getComponents, postComponents };