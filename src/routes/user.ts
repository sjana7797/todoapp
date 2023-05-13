import { Router } from "express";
import * as userController from "../controller/user";

const router = Router();

router.get("/list", userController.getUserList);

router.get("/me", userController.getMyProfile);

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/:id", userController.getUserDetails);

export default router;
