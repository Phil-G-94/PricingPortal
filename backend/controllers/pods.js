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

    const pod = await Pod.fetchPodByPodId(podId);

    if (!pod) {
        const error = new Error();
        error.message = "No pod found with that id.";
        error.cause = "The pod you want to edit doesn't exist.";
        return next(error);
    }

    console.log("Logging from EditPod controller: ", pod);

    res.status(200).json({
        message: "Pod edited succesfully",
        pod: pod,
    });
};

export { getPods, deletePod, editPod };
