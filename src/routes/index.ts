import { Router } from "express";
import utilityRoute from "./utility";
import userRoute from "./user";

const router = Router();

router.use("/", utilityRoute);
router.use("/user", userRoute);

export default router;
