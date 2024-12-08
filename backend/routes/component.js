import express from "express";
import * as componentController from "../controllers/component.js";
import validator from "express-validator";
1;
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.get("/components", isAuth, componentController.getComponents);

router.post(
    "/components",
    isAuth,
    [
        validator
            .body([
                "chassis",
                "motherboard",
                "islc",
                "CPU",
                "GPU",
                "RAM",
                "RAM_quantity",
                "SSD",
                "SSD_quantity",
            ])
            .escape(),
    ],
    componentController.postComponents
);

export { router };
