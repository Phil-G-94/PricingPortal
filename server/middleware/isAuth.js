import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.cookies.authToken;

        if (!token) {
            res.status(401).json({ message: "Unauthorised access." });
        }

        // verify token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        // attach user to the req object
        req.userId = verifiedToken.userId;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            err.statusCode = 401;
            err.message = "Token expired. Please log in again.";
        } else if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export { isAuth };
