import express from "express";
import userRouter from "./routes/user-route";
import connectDB from "./db/index";
import taskRouter from "./routes/task-route";
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/user", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send({
    success: true,
    msg: "Api is working",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
