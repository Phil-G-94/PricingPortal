import { getDb } from "../database/connection.js";

class Pod {
    constructor(spec, resellerPrice, retailPrice, userId) {
        this.spec = spec;
        this.resellerPrice = resellerPrice;
        this.retailPrice = retailPrice;
        this.userId = userId;
    }

    async save() {
        const db = await getDb();

        try {
            return db.collection("pods").insertOne(this);
        } catch (err) {
            console.error(err);
        }
    }
}

export { Pod };
