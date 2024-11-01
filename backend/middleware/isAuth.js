import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let verifiedToken;

    if (!token) {
        const error = new Error();
        error.code = 401;
        error.message = "No token present. User is not authorised.";
        throw error;
    }

    try {
        verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            throw err;
        }
    }

    if (!verifiedToken) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.userId = verifiedToken.userId;
    next();
};

export { isAuth };
