import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../model/user.js";
import { ObjectId } from "mongodb";

const putSignup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const validationErrors = validationResult(req);
    const errors = validationErrors.array();
    const existingUser = await User.findUserByEmail(email);

    if (existingUser) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = errors;
        return next(error);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 13);

        const user = new User(
            name,
            email,
            hashedPassword,
            new ObjectId()
        );

        await user.save();

        res.status(201).json({});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findUserByEmail(email);

        const passwordComparison = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordComparison) {
            const error = new Error();
            error.statusCode = 401;
            error.message = "Incorrect credentials.";
            return next(error);
        }

        const token = jwt.sign(
            { email: user.email, userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "1hr" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id.toString(),
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }
};

export { putSignup, postLogin };
