import { getDb } from "../database/connection.js";

class User {
    constructor(email, password, id) {
        this.email = email;
        this.password = password;
        this._id = id;
    }

    async save() {
        const db = await getDb();

        try {
            return db.collection("users").insertOne(this);
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        }
    }

    static async findUserByEmail(userEmail) {
        const db = await getDb();

        try {
            const user = await db.collection("users").findOne({
                email: userEmail,
            });

            return user;
        } catch (err) {
            console.log(err);

            if (!err.statusCode) {
                err.statusCode = 500;
            }

            next(err);
        }
    }
}

export { User };
