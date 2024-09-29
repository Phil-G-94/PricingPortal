import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../model/user.js";

const putSignup = (req, res, next) => {
    res.status(201).json({
        message: "Signup successful",
    });
};

const postLogin = (req, res, next) => {
    res.status(200).json({
        message: "Login successful",
    });
};

export { putSignup, postLogin };
