const getHome = (req, res, next) => {
    res.status(200).render("home", {
        spec: {},
        totalRetailCost: 0,
        totalResellerCost: 0,
    });
};

const postHome = (req, res, next) => {

    // input values received as strings, coerce to number
    const spec = {
        baseComponents: {
            chassis: +req.body.chassis,
            motherboard: +req.body.motherboard,
            islc: +req.body.islc,
            cooling_cabling: +req.body["cooling_cabling"],
            cpu: +req.body.cpu,
        },
        resourceComponents: {
            gpu: +req.body.gpu,
            ram: +req.body.ram,
            ssd: +req.body.ssd
        }
    };

    const baseComponentCost = Object.values(spec.baseComponents).reduce((partialSum, a) => partialSum + a, 0);
    const resourceComponentCost = (4 * spec.resourceComponents.ram) + (3 * spec.resourceComponents.ssd) + (7 * spec.resourceComponents.gpu);
    const margin = 3500;

    const totalRetailCost = (baseComponentCost + resourceComponentCost) + (1000 + margin);
    const totalResellerCost = (baseComponentCost + resourceComponentCost) + margin;

    return res.status(200).render("home", {
        spec,
        totalRetailCost,
        totalResellerCost,
    });

};

export { getHome, postHome };