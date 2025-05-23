import { sendMethodNotAllowed, sendOk } from "../../../../utils/apiMethods";
import { COLLECTION_NAME } from "../../../../utils/constants";
import { getCollection } from "../../../../utils/functions";

const getRecords = async (search) => {
  const collection = await getCollection(COLLECTION_NAME);

  if (!search) {
    return await collection.find({}).toArray();
  }

  const regex = new RegExp(search, "i");

  return await collection.find({
    $or: [
      { title: regex },
      { artist: regex },
      { album: regex },
      { genre: regex },
      { year: isNaN(search) ? undefined : parseInt(search) },
    ].filter(Boolean),
  }).toArray();
};

const createRecord = async (data) => {
  const collection = await getCollection(COLLECTION_NAME);
  const result = await collection.insertOne(data);
  return { _id: result.insertedId };
};

export default async function handler(req, res) {
  const { method, body, query } = req;

  try {
    switch (method) {
      case "GET": {
        const search = query.search || "";
        const result = await getRecords(search);
        return sendOk(res, result);
      }

      case "POST": {
        if (!body.title || !body.artist) {
          return res.status(400).json({ message: "Missing required fields: title or artist" });
        }
        const result = await createRecord(body);
        return sendOk(res, result);
      }

      default:
        return sendMethodNotAllowed(res, "Method Not Allowed!");
    }
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
