import { Router } from "express";
import { globalResponseCreator } from "../utils/response";
import { User } from "../models/user";
import { UserZodSchema } from "../zodSchema/user";
import bcrypt from "bcrypt";

const router = Router();

router.get("/list", async (req, res) => {
  const users = await User.find().exec();
  const data = { users, totalUser: users.length };
  const response = globalResponseCreator(data, "All users", 200);
  res.status(200).json(response);
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = UserZodSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const response = globalResponseCreator(user, "User created", 201);
    res.status(201).json(response);
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
});

router.get("/:id", async (req, res) => {
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
  }
});

export default router;
