import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

class Pod {
    constructor(spec, resellerPrice, retailPrice, user, userId) {
        this.spec = spec;
        this.resellerPrice = resellerPrice;
        this.retailPrice = retailPrice;
        this.user = user;
    }

    async save() {
        const db = await getDb();

        try {
            return db.collection("pods").insertOne(this);
        } catch (err) {
            console.error(err);
        }
    }

    static async fetchPodsByUserId(userId) {
        const db = await getDb();

        const query = {
            "user._id": ObjectId.createFromHexString(userId),
        };

        try {
            return db.collection("pods").find(query).toArray();
        } catch (err) {
            console.log(err);
        }
    }
}

export { Pod };
