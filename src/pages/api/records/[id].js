import { sendMethodNotAllowed, sendOk } from "../../../../utils/apiMethods";
import { COLLECTION_NAME } from "../../../../utils/constants";
import { getCollection } from "../../../../utils/functions";
import { ObjectId } from "mongodb";

const getRecord = async (id) => {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const updateRecord = async (id, data) => {
  const collection = await getCollection(COLLECTION_NAME);
  const { _id, addedAt, ...safeData } = data;

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: safeData }
  );

  return await collection.findOne({ _id: new ObjectId(id) });
};

const deleteRecord = async (id) => {
  const collection = await getCollection(COLLECTION_NAME);
  return await collection.deleteOne({ _id: new ObjectId(id) });
};

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { id } = query;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let result = null;

    switch (method) {
      case "GET": {
        result = await getRecord(id);
        break;
      }
      case "PUT": {
        console.log("🛠️ PUT update for ID:", id);
        console.log("📦 Body received:", body);
        result = await updateRecord(id, body);
        break;
      }
      case "DELETE": {
        result = await deleteRecord(id);
        break;
      }
      default:
        return sendMethodNotAllowed(res, "Method Not Allowed!");
    }

    return sendOk(res, result);
  } catch (error) {
    console.error("🔥 API error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
