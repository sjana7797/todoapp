import { type Response } from "express";
import jwt from "jsonwebtoken";
import env from "../lib/env";

export const sendCookie = async (id: string, res: Response) => {
  const token = jwt.sign({ _id: id }, env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};
