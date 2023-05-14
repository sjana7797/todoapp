import type { Handler } from "express";
import { taskCreateZodSchema, taskIdZodValidation } from "../zodSchema/task";
import { Task } from "../models/task";
import { globalResponseCreator } from "../utils/response";
import { applyPatch } from "fast-json-patch";

export const getUserTasks: Handler = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("unauthenticated");
    }
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
  } catch (error) {}
};

export const createTask: Handler = async (req, res) => {
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
    console.error(error);
  }
};

export const updatedTask: Handler = async (req, res) => {
  try {
    const { patch } = req.body;

    const { id } = taskIdZodValidation.parse(req.params);

    let task = await Task.findById(id).exec();

    if (!task) {
      const response = globalResponseCreator(
        null,
        `No Task found with provided ${id}`,
        404,
        `No Task found with provided ${id}`
      );
      return res.status(404).json(response);
    }

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
    console.error(error);
  }
};

export const deleteTask: Handler = async (req, res) => {
  try {
    const { id } = taskIdZodValidation.parse(req.params);
    const task = await Task.deleteOne({ _id: id });
    const response = globalResponseCreator(task, "Task deleted", 200);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

export const getTask: Handler = async (req, res) => {
  try {
    const { id } = taskIdZodValidation.parse(req.params);
    const task = await Task.findById(id);
    if (!task) {
      const response = globalResponseCreator(null, "Task not found", 404);
      return res.status(404).json(response);
    }
    const response = globalResponseCreator(task, "Task Fetched", 200);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};
