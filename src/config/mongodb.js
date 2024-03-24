import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/postaway2";

//mongodb://localhost:27017

let client;
export const connectToMongoDB = async () => {
  try {
    client = await MongoClient.connect(url);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err; // Rethrow the error to handle it elsewhere if needed
  }
};

export const getClient = () => {
  if (!client) {
    throw new Error("MongoDB client is not connected");
  }
  return client;
};

export const getDB = () => {
  if (!client) {
    throw new Error("MongoDB client is not connected");
  }
  return client.db();
};
