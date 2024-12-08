import express from "express";
import * as authController from "../controllers/auth.js";
import { body } from "express-validator";
import { User } from "../model/user.js";

const router = express.Router();

router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(async (value) => {
                const existingUser = await User.findUserByEmail(
                    value
                );

                if (existingUser.email === value) {
                    return Promise.reject(
                        "You're already signed up. Try logging in instead."
                    );
                }
            }),
    ],
    authController.putSignup
);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

export { router };
