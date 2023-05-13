import "dotenv/config";
import express from "express";
import env from "./lib/env";
import { connectDb } from "./lib/mongoose";
import router from "./routes";

const app = express();

const PORT = env.PORT || 5000;

connectDb();

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
