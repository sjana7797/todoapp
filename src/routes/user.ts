import { Router } from "express";
import * as userController from "../controller/user";

const router = Router();

router.get("/list", userController.getUserList);

router.post("/register", userController.registerUser);

router.get("/:id", userController.getUserDetails);

export default router;
