import { Pod } from "../model/pod.js";

const getPods = async (req, res, next) => {
    try {
        const pods = await Pod.fetchPodsByUserId(req.userId);

        if (!pods) {
            const error = new Error();
            error.message = "No pods to display";
            error.cause =
                "This user has no pods saved to the database.";
            return next(error);
        }

        res.status(200).json({
            pods,
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

const deletePod = async (req, res, next) => {
    const { podId } = req.params;

    const pod = await Pod.fetchPodByPodIdAndDelete(podId);

    if (!pod) {
        const error = new Error();
        error.message = "No pod to delete.";
        error.cause = "The pod you want to delete doesn't exist.";
        return next(error);
    }

    res.status(200).json({ message: "Pod deleted." });
};

const editPod = async (req, res, next) => {
    const { podId } = req.params;

    console.log(req.body);

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

    const resellerPrice =
        baseComponentCost + resourceComponentCost + margin;
    const retailPrice =
        baseComponentCost + resourceComponentCost + (1000 + margin);

    const pod = await Pod.fetchPodByPodId(podId);

    if (!pod) {
        const error = new Error();
        error.message = "No pod found with that id.";
        error.cause = "The pod you want to edit doesn't exist.";
        return next(error);
    }

    try {
        pod.spec = spec;
        pod.resellerPrice = resellerPrice;
        pod.retailPrice = retailPrice;
        await pod.updatePod(podId);
    } catch (error) {
        console.log(error);
    }

    res.status(200).json({
        message: "Pod edited succesfully",
    });
};

export { getPods, deletePod, editPod };
