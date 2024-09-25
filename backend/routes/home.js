import express from "express";
import * as homeController from "../controllers/home.js";
import validator from "express-validator";

const router = express.Router();

router.get("/", homeController.getComponents);

router.post(
    "/",
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
    homeController.postComponents
);

export { router };
