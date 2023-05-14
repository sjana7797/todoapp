import express from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", router);

export { app };
