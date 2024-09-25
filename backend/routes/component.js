import express from "express";
import * as componentController from "../controllers/component.js";
import validator from "express-validator";

const router = express.Router();

router.get("/components", componentController.getComponents);

router.post(
    "/components",
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
            .notEmpty()
            .escape(),
        validator.body("coolingCabling").notEmpty(),
    ],
    componentController.postComponents
);

export { router };
