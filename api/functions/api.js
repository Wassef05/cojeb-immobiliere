import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import fs from 'fs';
import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.route.js";
import projectRouter from "../routes/project.route.js";
import partnerRouter from "../routes/partner.route.js";
import dotenv from "dotenv";
import serverless from "serverless-http";  // Assurez-vous que serverless-http est bien importé

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.NODE_ENV === "local" ? "http://localhost:5173" : "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

let isDbConnected = false;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 60000,
  socketTimeoutMS: 120000,
})
  .then(() => {
    isDbConnected = true;
    console.log("Database connected");
  })
  .catch(err => console.error("Database connection error:", err));

// Middleware pour vérifier la connexion à la base de données
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

// Pour le déploiement AWS Lambda
export const handler = async (event, context) => {
  const result = await serverless(app)(event, context);
  return result;
};

// Pour le développement local
  const expressServer = http.createServer(app);
  expressServer.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });

