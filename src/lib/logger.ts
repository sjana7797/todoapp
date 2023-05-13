import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    // new winston.transports.File({
    //   filename: "./logs/error.log",
    //   level: "error",
    // }),
    // new winston.transports.File({ filename: "./logs/combined.log" }),
    // new winston.transports.Console(),
  ],
});

export { logger };
