import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

let _db = undefined;

function dbConnect(callback) {

    dotenv.config();

    /* add connection code */

    const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@pricingportal.knzuben.mongodb.net/?retryWrites=true&w=majority&appName=pricingPortal`;

    MongoClient
        .connect(uri)
        .then(client => {
            console.log("Connected to db!");
            _db = client.db("pricingPortal");
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

function getDb() {
    if (_db) {
        return _db;
    }

    throw "No database found!";
}
export { dbConnect, getDb };