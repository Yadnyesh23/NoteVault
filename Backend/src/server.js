import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';
import path from 'path';

dotenv.config();

// App
const app = express();

// Port
const port = process.env.PORT || 5000;

const __dirname = path.resolve()

// Middlerware
if(process.env.NODE_ENV !== 'production'){
  app.use(cors({
    origin:'http://localhost:5173'
  }))
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter)


// Routes
import { router as  healthCheckRoute } from './routes/healthcheck.route.js'
import {router as notesRouter} from './routes/notes.route.js'

app.use('/api/v1', healthCheckRoute)
app.use('/api/v1', notesRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, "../Frontend/dist/index.html")
    );
  });
}


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
