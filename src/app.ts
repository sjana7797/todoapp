import "dotenv/config";
import express from "express";
import env from "./lib/env";
import { connectDb } from "./database/mongoose";
import router from "./routes";
import { logger } from "./lib/logger";
import winston from "winston";

const app = express();

const PORT = env.PORT || 5000;

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

connectDb();

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
