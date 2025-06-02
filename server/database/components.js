import { getDb } from "../database/connection.js";

const fetchComponents = async () => {
  const db = await getDb();

  const componentsCollection = await db.collection("components");
  try {
    return componentsCollection.find().toArray();
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export { fetchComponents };
