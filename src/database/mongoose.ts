import mongoose from "mongoose";
import env from "../lib/env";
import { logger } from "../lib/logger";

const MONGO_URI = env.MONGO_URI;

export function connectDb() {
  mongoose
    .connect(MONGO_URI, {
      dbName: "todoApp",
    })
    .then(() => console.info("Connected to MongoDB"))
    .catch((error) => logger.error(error));
}
