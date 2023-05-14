import { Router } from "express";
import utilityRoute from "./utility";
import userRoute from "./user";
import taskRoute from "./task";

const router = Router();

router.use("/", utilityRoute);
router.use("/user", userRoute);
router.use("/task", taskRoute);

export default router;
