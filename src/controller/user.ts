import { type Handler } from "express";
import { User } from "../models/user";
import { globalResponseCreator } from "../utils/response";
import { UserLoginSchema, UserZodSchema } from "../zodSchema/user";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features";
import jwt from "jsonwebtoken";
import env from "../lib/env";

export const getUserList: Handler = async (req, res) => {
  try {
    const users = await User.find().exec();
    const data = { users, totalUser: users.length };
    const response = globalResponseCreator(data, "All users", 200);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = globalResponseCreator(
      null,
      "Something went wrong",
      500,
      "Error"
    );
    res.status(500).json(response);
  }
};

export const getUserDetails: Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).exec();
    const response = globalResponseCreator(
      user,
      "User Fetch successfully",
      200
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    const response = globalResponseCreator(
      null,
      "Something went wrong",
      500,
      "Error"
    );
    res.status(500).json(response);
  }
};

export const getMyProfile: Handler = async (req, res) => {
  const response = globalResponseCreator(req.user, "User profile fetched", 200);
  return res.status(200).json(response);
};

export const login: Handler = async (req, res) => {
  try {
    const { email, password } = UserLoginSchema.parse(req.body);

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json(
          globalResponseCreator(
            null,
            "Invalid email or password",
            404,
            "Invalid email or password"
          )
        );
    }
    const match = await bcrypt.compare(password, user?.password ?? "");
    if (!match) {
      return res
        .status(404)
        .json(
          globalResponseCreator(
            null,
            "Invalid email or password",
            404,
            "Invalid email or password"
          )
        );
    }
    const response = globalResponseCreator(
      user,
      `Welcome back,${user?.name}`,
      200
    );
    sendCookie(user._id.toString(), res);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
};

export const register: Handler = async (req, res) => {
  try {
    const { email, password, name } = UserZodSchema.parse(req.body);

    let user = await User.findOne({ email }).select("+password");

    if (user) {
      return res
        .status(400)
        .json(
          globalResponseCreator(
            null,
            "User Already exist",
            400,
            "User Already exist"
          )
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ email, name, password: hashedPassword });
    const response = globalResponseCreator(user, `Welcome,${user?.name}`, 201);
    sendCookie(user?._id.toString(), res);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
  }
};

export const logout: Handler = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json(globalResponseCreator(null, "Logout successfully", 200));
};
