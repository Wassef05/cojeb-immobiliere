
// index.js
import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'; // Assurez-vous que dotenv est correctement configuré
import userRouter from "./api/routes/user.route.js";
import authRouter from "./api/routes/auth.route.js";
import projectRouter from "./api/routes/project.route.js";
import partnerRouter from "./api/routes/partner.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

app.use(cookieParser());
// app.use(cors({
//   origin: process.env.NODE_ENV === "local" ? "http://localhost:5173" : "*",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

// }));

const allowedOrigin = process.env.NODE_ENV === 'local' ? 'http://localhost:5173' : process.env.API_URL;

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

const expressServer = http.createServer(app);
const PORT = process.env.PORT || 4000;

// Connect to the database
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI environment variable is not defined');
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/partners", partnerRouter);  



// Deployment settings
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
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

// Socket.io setup
const io = new Server(expressServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      // "https://property-sell.vercel.app",
      // "https://property-sell-gjz462ec1-emoncr.vercel.app/",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`socket connected with ${socket.id}`);
  socket.on("join_room", (chatId) => {
    socket.join(chatId);
  });
  socket.on("send_message", (data) => {
    socket.to(data.chatId).emit("receive_message", data);
    socket.broadcast.emit(`${data.to}`, data);
  });
  socket.on("disconnect", () => {
    console.log(`user disconnected successfully ${socket.id}`);
  });
});

// Start server
expressServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

export default () => expressServer;
