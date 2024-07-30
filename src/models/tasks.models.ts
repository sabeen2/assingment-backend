import mongoose, { Schema } from "mongoose";
import { ITask } from "../types";

const taskSchema: Schema<ITask> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["To-Do", "In Progress", "Under Review", "Completed"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent"],
    },
    deadline: { type: String },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);





