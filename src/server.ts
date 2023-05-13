import "dotenv/config";
import { app } from "./app";
import { connectDb } from "./database/mongoose";
import env from "./lib/env";
import { logger } from "./lib/logger";
import winston from "winston";

if (env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const PORT = env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
