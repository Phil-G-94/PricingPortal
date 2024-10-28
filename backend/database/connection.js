import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let _db = undefined;

async function dbConnect(callback) {
    dotenv.config();

    const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}${process.env.MDB_HOST}/?retryWrites=true&w=majority&appName=${process.env.MDB_APP}`;

    try {
        const client = await MongoClient.connect(uri);

        console.log("Connected to db!");

        _db = client.db("pricingPortal");

        callback();
    } catch (err) {
        console.error(err);
    }
}

async function getDb() {
    try {
        await _db;
        if (_db) {
            return _db;
        }
    } catch (err) {
        console.error(err);
    }
}
export { dbConnect, getDb };
