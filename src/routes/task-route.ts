import { jwtAuth } from "../middlewares/user";
import { Task } from "../models/tasks.models";
import { User } from "../models/user.model";
require("dotenv").config();
import { Request, Response } from "express";

const { Router } = require("express");
const taskRouter = Router();

taskRouter.post("/add-task", jwtAuth, async (req: Request, res: Response) => {
  const { title, description, status, priority, deadline, username } =
    req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(403).json({
      success: false,
      msg: "User not found",
    });
  }

  const task = await Task.create({
    title,
    description,
    status,
    priority,
    deadline,
    createdBy: user?._id,
  });

  await res.send({
    success: "true",
    msg: "Task created successfully",
    taskId: task._id,
  });
});

// Get all tasks for a user
// taskRouter.get(
//   "/getAll/:username",
//   jwtAuth,
//   async (req: Request, res: Response) => {
//     const { username } = req.params;

//     try {
//       const user = await User.findOne({ username });

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           msg: "User not found",
//         });
//       }

//       const tasks = await Task.find({ createdBy: user._id });

//       res.status(200).json({
//         success: true,
//         tasks,
//       });
//     } catch (error) {
//       console.error("Error retrieving tasks:", error);
//       return res.status(500).json({
//         success: false,
//         msg: "Internal server error",
//       });
//     }
//   }
// );


taskRouter.get(
  "/getAll/:username",
  jwtAuth,
  async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
      // Find user by username
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User not found",
        });
      }

      const tasks = await Task.find({ createdBy: user._id });

      res.status(200).json({
        success: true,
        tasks,
      });
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  }
);

// Delete a task
taskRouter.get(
  "/delete/:taskId",
  jwtAuth,
  async (req: Request, res: Response) => {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        msg: "Task ID is required",
      });
    }

    try {
      const task = await Task.findByIdAndDelete(taskId);

      if (!task) {
        return res.status(404).json({
          success: false,
          msg: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        msg: "Task deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
      });
    }
  }
);

// Update a task with taskId in the request body
taskRouter.post("/update", jwtAuth, async (req: Request, res: Response) => {
  const { taskId, title, description, status, priority, deadline } = req.body;

  if (!taskId) {
    return res.status(400).json({
      success: false,
      msg: "Task ID is required",
    });
  }

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, priority, deadline },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
});
export default taskRouter;
