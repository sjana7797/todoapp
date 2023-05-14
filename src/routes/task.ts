import type { NextFunction, Request, Response } from "express";
import { isAuthenticated } from "../middleware/auth";
import * as TaskController from "../controller/task";
import { globalResponseCreator } from "../utils/response";
import { Router } from "express";
import { errorHandler } from "../middleware/error";

const router = Router();

router.get("/list", isAuthenticated, TaskController.getUserTasks);

router.post("/create", isAuthenticated, TaskController.createTask);

router.use("/:id", isAuthenticated);
router
  .route("/:id")
  .patch(TaskController.updatedTask)
  .delete(TaskController.deleteTask)
  .get(TaskController.getTask);

router.use(errorHandler);

export default router;
