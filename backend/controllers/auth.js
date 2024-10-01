import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../model/user.js";
import { ObjectId } from "mongodb";

const putSignup = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const hashedPassword = await bcrypt.hash(password, 13);

        const user = new User(email, hashedPassword, new ObjectId());

        await user.save();

        res.status(201).json({
            message: "Signup successful - user added to database",
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

const postLogin = async (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;


    try {

        const user = await User.findUserByEmail(email);

        const passwordComparison = await bcrypt.compare(password, user.password);

        if (!passwordComparison) {
            const error = new Error("Incorrect credentials.");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }

        next(err);
    }

};

export { putSignup, postLogin };
