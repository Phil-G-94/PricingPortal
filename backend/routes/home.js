import express from "express";
import * as homeController from "../controllers/home.js";

const router = express.Router();

router.get("/", homeController.getHome);

router.post("/", homeController.postHome);

export { router };