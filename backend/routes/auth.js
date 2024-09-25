import express from "express";
import * as authController from "../controllers/auth.js";

const router = express.Router();

router.put("/signup", authController.putSignup);

router.post("/login", authController.postLogin);

export { router };
