import mongoose from "mongoose";
import env from "./env";

const MONGO_URI = env.MONGO_URI;

export function connectDb() {
  mongoose
    .connect(MONGO_URI, {
      dbName: "todoApp",
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error(error));
}
