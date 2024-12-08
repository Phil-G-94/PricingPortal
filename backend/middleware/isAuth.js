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

        /*
            set token through cookies adjustment
            replace the above with the below;

           // access token through cookie

           const token = req.cookies.authToken;

           if (!token) {
            const error = new Error("User not authorised.");
            error.statusCode = 401;
            throw error;
           }

        */

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
};

export { isAuth };
