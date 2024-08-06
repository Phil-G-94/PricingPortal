import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

async function run() {
    /* add connection code */

    dotenv.config({ path: "../.env" });

    const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@pricingportal.knzuben.mongodb.net/?retryWrites=true&w=majority&appName=pricingPortal`;

    console.log(process.env.MDB_USER);

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();

    databaseList.databases.forEach(db => console.log(`${db.name}`));
}

run().catch(console.error);