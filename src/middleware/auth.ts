import type { Handler } from "express";
import { globalResponseCreator } from "../utils/response";
import env from "../lib/env";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const isAuthenticated: Handler = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    const response = globalResponseCreator(null, "Login first", 401, "Error");
    return res.status(401).json(response);
  }
  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (typeof decoded === "string") {
    const response = globalResponseCreator(null, "Login first", 401, "Error");
    return res.status(401).json(response);
  }
  const id = decoded._id;
  const user = await User.findById(id).exec();
  if (!user) {
    const response = globalResponseCreator(null, "Login first", 401, "Error");
    return res.status(401).json(response);
  }
  req.user = {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  next();
};
