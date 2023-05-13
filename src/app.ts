import "dotenv/config";
import express from "express";
import env from "./lib/env";
import { connectDb } from "./lib/mongoose";
import router from "./routes";
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const app = express();

const PORT = env.PORT || 5000;

connectDb();

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
