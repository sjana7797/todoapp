import type { Handler } from "express";
import { taskCreateZodSchema, taskIdZodValidation } from "../zodSchema/task";
import { Task } from "../models/task";
import { globalResponseCreator } from "../utils/response";
import { applyPatch } from "fast-json-patch";
import { ErrorHandler } from "../middleware/error";

export const getUserTasks: Handler = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new ErrorHandler("unauthenticated", 401);

    const tasks = await Task.find({ user: user._id });
    const data = {
      tasks,
      totalTask: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
    };
    const response = globalResponseCreator(
      data,
      "Task fetch successfully",
      200
    );

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const createTask: Handler = async (req, res, next) => {
  try {
    const { description, title } = taskCreateZodSchema.parse(req.body);
    const user = req.user;
    const task = await Task.create({
      description,
      title,
      user: user?._id,
    });
    const response = globalResponseCreator(
      task,
      "Task added successfully",
      200
    );
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updatedTask: Handler = async (req, res, next) => {
  try {
    const { patch } = req.body;

    const { id } = taskIdZodValidation.parse(req.params);

    let task = await Task.findById(id).exec();
    if (!task) throw new ErrorHandler(`No Task found with provided ${id}`, 404);

    if (!patch.length) {
      const response = globalResponseCreator(task, "Updated", 201);
      return res.status(201).json(response);
    }

    const patchData = applyPatch(task?.toJSON(), patch).newDocument;
    if (!patchData) {
      const response = globalResponseCreator(task, "Updated", 201);
      return res.status(201).json(response);
    }

    if (!Object.keys(patchData).length) {
      const response = globalResponseCreator(task, "Updated", 201);
      return res.status(201).json(response);
    }

    task = await Task.findByIdAndUpdate(id, patchData, {
      upsert: false,
      new: true,
    });

    const response = globalResponseCreator(
      task,
      "Task updated successfully",
      201
    );

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteTask: Handler = async (req, res, next) => {
  try {
    const { id } = taskIdZodValidation.parse(req.params);
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) throw Error("Task not found");
    const response = globalResponseCreator(task, "Task deleted", 200);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getTask: Handler = async (req, res, next) => {
  try {
    const { id } = taskIdZodValidation.parse(req.params);
    const task = await Task.findById(id);
    if (!task) throw Error("Task not found");
    const response = globalResponseCreator(task, "Task Fetched", 200);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
