import express from "express";
import validator from "express-validator";
import * as componentController from "./controllers/component.js";
import * as podsController from "./controllers/pods.js";

const router = express.Router();

/**
 * check auth route
 */

router.get("/check-auth", (req, res) => {
    res.status(200).json({ authenticated: true });
});

/**
 * component routes
 */

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
            .escape(),
    ],
    componentController.postComponents
);

/**
 * pods routes
 */

router.get("/pods", podsController.getPods);
router.delete("/pods/:podId", podsController.deletePod);
router.put("/pods/:podId", podsController.editPod);

export default router;
