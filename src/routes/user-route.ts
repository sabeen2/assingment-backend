import { jwtAuth, userAuth } from "../middlewares/user";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
require("dotenv").config();
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        msg: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      msg: "User Created Successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

userRouter.post("/login", userAuth, async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    res.status(200).json({
      success: true,
      msg: "Login Successful",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});

userRouter.get("/test", jwtAuth, async (req: Request, res: Response) => {
  return res.send({
    success: "true",
    msg: "Successfull jwtAuth",
  });
});

export default userRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhYmVlbiIsImlhdCI6MTcyMjE4ODI3NiwiZXhwIjoxNzIyMjc0Njc2fQ.-NP8jIQc2xfwDj49PyTrOkNG7RBCqGI79u5mmseGZs0
