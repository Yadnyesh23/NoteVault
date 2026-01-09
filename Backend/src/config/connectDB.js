import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      `Database Connected Successfully\nDB Host: ${connectionInstance.connection.host}\nDB Name: ${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw new ApiError(500, "Database connection error");
  }
};

export default connectDB;
