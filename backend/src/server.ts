import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import { db } from "./db"; // Initializes DB connection, registers event listeners, and starts the Queue worker daemon
import { initializeListeners } from "./modules/notifications/notification.listeners";

// Initialize event listeners after db has been loaded
initializeListeners();

const app = express();
const port = process.env.PORT || 3002;

// Middleware configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount the API Router under /api
app.use("/api", router);

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Express global error handler:", err);
  res.status(err.status || 500).json({
    error: err.message || "An unexpected error occurred",
    code: err.code || "INTERNAL_SERVER_ERROR",
  });
});

app.listen(port, () => {
  console.log(`PREMA backend server successfully running on port ${port}`);
});

export default app;
