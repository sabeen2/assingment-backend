import mongoose from "mongoose";
require("dotenv").config();

// Connect to MongoD

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
