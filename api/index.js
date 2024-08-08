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
const MONGO_URI = "mongodb+srv://wassef:PkJWNDPbfTkVregC@atlascluster.u9k8pq5.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const API_URL = "https://cojeb-immobiliere.vercel.app";
const NODE_ENV = "production";
const PORT = process.env.PORT || 4000;
const JWT_SECRET = "wassef";

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = NODE_ENV === 'production' ? [API_URL] : ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

const expressServer = http.createServer(app);

// Connect to the database
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

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

// Start server
expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export default () => expressServer;
