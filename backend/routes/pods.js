import express from "express";
import * as podController from "../controllers/pods.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/pods", isAuth, podController.getPods);

export { router };
