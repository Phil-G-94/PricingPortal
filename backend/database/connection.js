import { MongoClient } from "mongodb";
import dotenv from "dotenv";

let _db;
let client;

async function dbConnect() {
    dotenv.config();

    const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}${process.env.MDB_HOST}/?retryWrites=true&w=majority&appName=${process.env.MDB_APP}`;

    try {
        client = new MongoClient(uri);

        await client.connect();

        console.log("Opened connection to db.");

        _db = client.db("pricingPortal");

    } catch (err) {
        console.error(err);
    }
}

async function getDb() {
    if (!_db) {
        throw new Error("Database not initialised");
    }

    return _db;
}

process.on("SIGINT", async () => {
    if (client) {
        await client.close();
        console.log("Closed connection to db.");
        process.exitCode = 0;
    }
});

export { dbConnect, getDb };
