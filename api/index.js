import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import projectRouter from "./routes/project.route.js";
import partnerRouter from "./routes/partner.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";

// Définir les variables d'environnement directement dans le code
const MONGO_URI = "mongodb+srv://cojeb:wassef123@wassef.rjgpu.mongodb.net/?retryWrites=true&w=majority&appName=wassef";
const NODE_ENV = "production";
const PORT = process.env.PORT || 4000;
const JWT_SECRET = "wassef";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["https://cojeb-immobiliere.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

const expressServer = http.createServer(app);

// Connect to the database
let isDbConnected = false;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout
  socketTimeoutMS: 45000, // 45 seconds timeout
})
  .then(() => {
    isDbConnected = true;
    console.log("Database connected");
  })
  .catch(err => console.error("Database connection error:", err));

// Middleware to check database connection
app.use((req, res, next) => {
  if (!isDbConnected) {
    return res.status(503).json({ success: false, message: "Database connection pending" });
  }
  next();
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/partners", partnerRouter);  

// Deployment settings
const __dirname = path.resolve();
if (NODE_ENV === "production") {
  const staticFilesPath = path.join(__dirname, "client", "dist");
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

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.disconnect();
  expressServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export default () => expressServer;
