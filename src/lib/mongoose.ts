import mongoose from "mongoose";
import env from "./env";
import { logger } from "./logger";

const MONGO_URI = env.MONGO_URI;

export function connectDb() {
  mongoose
    .connect(MONGO_URI, {
      dbName: "todoApp",
    })
    .then(() => logger.info("Connected to MongoDB"))
    .catch((error) => logger.error(error));
}
