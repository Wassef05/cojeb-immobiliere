import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import projectRouter from "./routes/project.route.js";
import partnerRouter from "./routes/partner.route.js";
import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in the .env file.");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["https://cojeb-immobiliere.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

const expressServer = http.createServer(app);

let isDbConnected = false;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 120000,
})
  .then(() => {
    isDbConnected = true;
    console.log("Database connected");
  })
  .catch(err => console.error("Database connection error:", err));

app.use((req, res, next) => {
  if (!isDbConnected) {
    return res.status(503).json({ success: false, message: "Database connection pending" });
  }
  next();
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/partners", partnerRouter);

// Deployment settings
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  const staticFilesPath = path.join(__dirname,"..", "client", "dist");
  app.use(express.static(staticFilesPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(staticFilesPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API listing...");
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export default () => expressServer;
