import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        // get auth header
        const authHeader = req.get("Authorization");

        // if no header present, throw
        if (!authHeader) {
            const error = new Error(
                "No token present. User is not authorised."
            );
            error.statusCode = 401;
            throw error;
        }

        // get token
        const token = authHeader.split(" ")[1];

        // verify token
        const verifiedToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // attach user to the req object
        req.userId = verifiedToken.userId;

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            // explicitly handle expired tokens
            err.statusCode = 401;
            err.message = "Token expired. Please log in again.";
        } else if (!err.statusCode) {
            // handle generic server errors
            err.statusCode = 500;
        }
        // pass error to error handling middleware
        next(err);
    }

    // const token = req.get("Authorization").split(" ")[1];
    // let verifiedToken;

    // if (!token) {
    //     const error = new Error();
    //     error.code = 401;
    //     error.message = "No token present. User is not authorised.";
    //     throw error;
    // }

    // try {
    //     verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (err) {
    //     if (!err.statusCode) {
    //         err.statusCode = 500;
    //         throw err;
    //     }
    // }

    // if (!verifiedToken) {
    //     const error = new Error("Not authenticated");
    //     error.statusCode = 401;
    //     throw error;
    // }
    // req.userId = verifiedToken.userId;
    // next();
};

export { isAuth };
