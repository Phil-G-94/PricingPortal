import { ObjectId } from "mongodb";
import { getDb } from "../database/connection.js";

class Pod {
    constructor({
        spec,
        resellerPrice,
        retailPrice,
        user,
        createdAt,
    }) {
        this.spec = spec;
        this.resellerPrice = resellerPrice;
        this.retailPrice = retailPrice;
        this.user = user;
        this.createdAt = createdAt;
    }

    async save() {
        const db = await getDb();

        try {
            return db.collection("pods").insertOne(this);
        } catch (error) {
            console.error(error);
        }
    }

    async updatePod(podId) {
        const db = await getDb();

        const query = { _id: ObjectId.createFromHexString(podId) };

        const updatedPod = await db
            .collection("pods")
            .updateOne(query, {
                $set: {
                    spec: this.spec,
                    resellerPrice: this.resellerPrice,
                    retailPrice: this.retailPrice,
                },
                $createdAt: new Date(),
            });

        if (updatedPod.matchedCount === 0) {
            throw new Error("Pod not found");
        }

        return updatedPod;
    }

    static async fetchPodByPodId(podId) {
        const db = await getDb();

        const query = {
            _id: ObjectId.createFromHexString(podId),
        };

        try {
            const podData = await db
                .collection("pods")
                .findOne(query);

            return podData ? new Pod(podData) : null;
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
