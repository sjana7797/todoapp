import { Router } from "express";
import * as userController from "../controller/user";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

router.get("/list", userController.getUserList);

router.get("/me", isAuthenticated, userController.getMyProfile);

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/logout", userController.logout);

router.get("/:id", userController.getUserDetails);

export default router;
