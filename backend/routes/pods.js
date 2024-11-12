import express from "express";
import * as podController from "../controllers/pods.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/pods", isAuth, podController.getPods);
router.delete("/pods/:podId", isAuth, podController.deletePod);
router.put("/pods/:podId", isAuth, podController.editPod);

export { router };
