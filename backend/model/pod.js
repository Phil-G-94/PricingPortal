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
        } catch (error) {
            console.error(error);
        }
    }

    static async fetchPodByPodId(podId) {
        const db = await getDb();

        const query = {
            _id: Object.createFromHexString(podId),
        };

        try {
            return db.collection("pods").findOne(query);
        } catch (error) {
            console.log(error);
        }
    }

    static async fetchPodsByUserId(userId) {
        const db = await getDb();

        const query = {
            "user._id": ObjectId.createFromHexString(userId),
        };

        try {
            return db.collection("pods").find(query).toArray();
        } catch (error) {
            console.error(error);
        }
    }

    static async fetchPodByPodIdAndDelete(podId) {
        const db = await getDb();

        const query = {
            _id: ObjectId.createFromHexString(podId),
        };

        try {
            return db.collection("pods").deleteOne(query);
        } catch (error) {
            console.error(error);
        }
    }
}

export { Pod };
