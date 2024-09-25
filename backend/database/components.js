import { getDb } from "../database/connection.js";

const fetchComponents = async () => {
    const db = await getDb();

    const components = await db
        .collection("components")
        .find()
        .toArray();

    try {
        return components;
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

export { fetchComponents };
