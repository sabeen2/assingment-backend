// import mongoose, { Schema } from "mongoose";
// import { ITask } from "../types";

// const taskSchema: Schema<ITask> = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, default: "" },
//     status: {
//       type: String,
//       required: true,
//       enum: ["To-Do", "In Progress", "Under Review", "Completed"],
//       default: "To-Do",
//     },
//     priority: {
//       type: String,
//       enum: ["Low", "Medium", "Urgent"],
//       default: "Low",
//     },
//     deadline: { type: String },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Task = mongoose.model<ITask>("Task", taskSchema);




import mongoose, { Schema } from "mongoose";
import { ITask } from "../types";

const validateEnum = (value: string, enumValues: string[]): boolean => {
  return enumValues.includes(value);
};

const taskSchema: Schema<ITask> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      required: true,
      enum: ["To-Do", "In Progress", "Under Review", "Completed"],
      default: "To-Do",
      validate: {
        validator: function (value: string) {
          return validateEnum(value, ["To-Do", "In Progress", "Under Review", "Completed"]);
        },
        message: (props) => `${props.value} is not a valid status`,
      },
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent"],
      default: "Low",
      validate: {
        validator: function (value: string) {
          return validateEnum(value, ["Low", "Medium", "Urgent"]);
        },
        message: (props) => `${props.value} is not a valid priority`,
      },
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
