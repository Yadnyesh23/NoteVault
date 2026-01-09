import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();

// App
const app = express();

// Port
const port = process.env.PORT || 5000;

// Routes
import { router as  healthCheckRoute } from './routes/healthcheck.route.js'

app.use('/api/v1', healthCheckRoute)

// Server
async function startServer() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
