import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

require("dotenv").config();

//Login Verification Middleware
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({
        success: false,
        msg: "Invalid username or password",
      });
    }

    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

//JWT Verification Middleware
export const jwtAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      success: false,
      msg: "Authorization header missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(403).json({
      success: false,
      msg: "Invalid JWT Token",
    });
  }
};
