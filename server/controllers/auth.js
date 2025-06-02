import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../models/user.js";
import { ObjectId } from "mongodb";

const postSignup = async (req, res, next) => {
  const { signup_name, signup_email, signup_password } = req.body;
  const validationErrors = validationResult(req);
  const errors = validationErrors.array();
  const existingUser = await User.findUserByEmail(signup_email);

  if (existingUser) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors;
    return next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(signup_password, 13);

    const user = new User(signup_name, signup_email, hashedPassword, new ObjectId());

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
  const { login_email, login_password } = req.body;

  try {
    const user = await User.findUserByEmail(login_email);

    const passwordComparison = await bcrypt.compare(login_password, user.password);

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

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

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

// const postLogout = (req, res, next) => {
//     res.cookie("authToken", "", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "none", // because front- and  back-end domains differ, otherwise "strict"
//         expires: new Date(0),
//     });

//     res.status(200).json({ message: "Logged out successfully" });
// };

export { postSignup, postLogin };
