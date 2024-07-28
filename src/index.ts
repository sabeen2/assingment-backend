import express from "express";
import userRouter from "./routes/user-route";
import connectDB from "./db/index";
import taskRouter from "./routes/task-route";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use("/user", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
