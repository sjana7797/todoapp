import express from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import env from "./lib/env";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    origin: [env.FRONTEND_URL],
  })
);

app.use("/api/v1", router);

export { app };
