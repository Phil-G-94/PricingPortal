import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";
import { Pod } from "../models/pod.js";

const getPods = async (req, res, next) => {
  try {
    const pods = await Pod.fetchPodsByUserId(req.userId);

    if (!pods) {
      const error = new Error();
      error.message = "No pods to display.";
      error.cause = "This user has no pods saved to the database.";
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

const getPod = async (req, res, next) => {
  const { podId } = req.params;

  try {
    const pod = await Pod.fetchPodByPodId(podId);

    if (!pod) {
      const error = new Error();
      error.message = "No pod to display.";
      error.cause = "This pod doesn't exist.";
      return next(error);
    }

    res.status(200).json({ pod });
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

  const db = await getDb();

  // get cmp ids from req.body
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

  // validate and convert ids

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
    .map((id) => (ObjectId.isValid(id) ? ObjectId.createFromHexString(id) : null))
    .filter(Boolean);

  // Fetch full component docs from DB
  const selectedCmps = await db
    .collection("components")
    .find({ _id: { $in: selectedCmpIds } })
    .toArray();

  // transform array of cmp objects into 2D array
  const extractCmpInfo = ({ ids, quantities, selectedCmps }) => {
    return Object.entries(ids).map(([key, id]) => {
      const quantity = quantities?.[key] ?? 1; // nullish coalescing - return 11 if !quantities

      const component = selectedCmps.find((cmp) => cmp._id.toString() === id);
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
    return components.reduce((total, [, { cost }]) => total + cost, 0);
  };

  // updated pod spec
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

  const baseCmpCost = sumCmpCosts(spec.baseComponents);
  const resourceCmpCost = sumCmpCosts(spec.resourceComponents);
  const margin = 3500;
  const resellerFee = 1000;
  const resellerPrice = baseCmpCost + resourceCmpCost + margin;
  const retailPrice = baseCmpCost + resourceCmpCost + (resellerFee + margin);

  try {
    const pod = await Pod.fetchPodByPodId(podId);

    if (!pod) {
      const error = new Error("No pod found with that id.");
      error.cause = "The pod you want to edit doesn't exist.";
      return next(error);
    }

    // update spec and price fields
    pod.spec = spec;
    pod.resellerPrice = resellerPrice;
    pod.retailPrice = retailPrice;

    await pod.updatePod(podId);

    res.status(200).json({ message: "Pod edited successfully" });
  } catch (err) {
    console.error(err);
    err.statusCode = 500;
    next(err);
  }
};

export { getPods, getPod, deletePod, editPod };
