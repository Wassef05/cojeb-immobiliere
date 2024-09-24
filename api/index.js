// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import path from "path";
// import http from "http";
// import fs from 'fs'; // Importation du module fs
// import userRouter from "./routes/user.route.js";
// import authRouter from "./routes/auth.route.js";
// import projectRouter from "./routes/project.route.js";
// import partnerRouter from "./routes/partner.route.js";
// import dotenv from "dotenv";

// // Charger les variables d'environnement depuis le fichier .env
// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;
// const NODE_ENV = process.env.NODE_ENV || "development";
// const PORT = process.env.PORT || 4000;

// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//   origin: process.env.NODE_ENV === "local" ? "http://localhost:5173" : "*",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

// const expressServer = http.createServer(app);

// let isDbConnected = false;

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 60000, // 30 secondes
//   socketTimeoutMS: 120000, // 2 minutes
// })
//   .then(() => {
//     isDbConnected = true;
//     console.log("Database connected");
//   })
//   .catch(err => console.error("Database connection error:", err));

// // Middleware pour vérifier la connexion à la base de données
// app.use((req, res, next) => {
//   if (!isDbConnected) {
//     return res.status(503).json({ success: false, message: "Database connection pending" });
//   }
//   next();
// });

// // Routes
// app.use("/api/users", userRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/projects", projectRouter);
// app.use("/api/partners", partnerRouter);

// const __dirname = path.resolve();
// const staticFilesPath = path.join(__dirname, "..","client", "dist");

// if (NODE_ENV === "production") {
//   if (fs.existsSync(staticFilesPath)) {
//     app.use(express.static(staticFilesPath));
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(staticFilesPath, "index.html"));
//     });
//   } else {
//     console.warn("Static files path does not exist. Serving fallback message.");
//     app.get("*", (req, res) => {
//       res.status(404).send("Static files not found. Please ensure your build is deployed.");
//     });
//   }
// } else {
//   app.get("/", (req, res) => {
//     res.send("API listing...");
//   });
// }


// // Middleware pour gérer les erreurs
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({ success: false, statusCode, message });
// });

// expressServer.listen(PORT, () => {
//   console.log(`Server running at port ${PORT}`);
// });

// export default () => expressServer;
