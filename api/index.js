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
//   origin: ["https://cojeb-immobiliere.vercel.app"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// }));

// const expressServer = http.createServer(app);

// let isDbConnected = false;

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000, // 30 secondes
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

// if (NODE_ENV === "production") {
//   // Chemin corrigé pour Vercel
//   const staticFilesPath = path.join(__dirname, "..", "client", "dist");

//   if (fs.existsSync(staticFilesPath)) {
//     app.use(express.static(staticFilesPath));
//     app.get("*", (req, res) => {
//       res.sendFile(path.join(staticFilesPath, "index.html"));
//     });
//   } else {
//     console.error("Le chemin d'accès du fichier statique n'existe pas :", staticFilesPath);
//     app.get("*", (req, res) => {
//       res.status(404).send("Fichiers statiques non trouvés");
//     });
//   }
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
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import NodeCache from "node-cache";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import projectRouter from "./routes/project.route.js";
import partnerRouter from "./routes/partner.route.js";
import { fileURLToPath } from 'url';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4000;

// Initialiser le cache (avec un TTL par défaut de 5 minutes)
const cache = new NodeCache({ stdTTL: 300 });

// Vérifier si les variables d'environnement requises sont définies
if (!MONGO_URI) {
  console.error("MONGO_URI n'est pas défini dans le fichier .env.");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://cojeb-immobiliere.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const expressServer = http.createServer(app);

let isDbConnected = false;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30sec
    socketTimeoutMS: 120000, // 2min
  })
  .then(() => {
    isDbConnected = true;
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => console.error("Erreur de connexion à la base de données :", err));

// Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/partners", partnerRouter);

// Middleware pour vérifier la connexion à la base de données
app.use((req, res, next) => {
  if (!isDbConnected) {
    return res.status(503).json({ success: false, message: "Connexion à la base de données en attente" });
  }
  next();
});

// Middleware pour vérifier le cache
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);
  if (cachedResponse) {
    return res.json(cachedResponse);
  } else {
    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body);
      res.originalJson(body);
    };
    next();
  }
};

// Exemple de route avec pagination et cache
app.get("/api/projects", cacheMiddleware, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const projects = await Project.find().skip(skip).limit(limit).exec();
    const total = await Project.countDocuments();

    res.json({
      success: true,
      data: projects,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (err) {
    next(err);
  }
});

// Exemple de route qui gère les tâches lourdes de manière asynchrone
app.post("/api/heavy-task", async (req, res, next) => {
  try {
    res.json({ success: true, message: "La tâche a commencé. Vous serez notifié une fois terminée." });
    // Démarrer la tâche lourde de manière asynchrone
    setImmediate(async () => {
      await performHeavyTask(req.body);
      console.log("Tâche lourde terminée");
    });
  } catch (err) {
    next(err);
  }
});
// Solution pour __dirname dans un module ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin statique mis à jour pour Vercel
const staticFilesPath = path.join(__dirname, "dist");

if (NODE_ENV === "production") {
  if (fs.existsSync(staticFilesPath)) {
    app.use(express.static(staticFilesPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(staticFilesPath, "index.html"));
    });
  } else {
    console.error("Le chemin d'accès du fichier statique n'existe pas :", staticFilesPath);
    app.get("*", (req, res) => {
      res.status(404).send("Fichiers statiques non trouvés");
    });
  }
}

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur interne du serveur";
  res.status(statusCode).json({ success: false, statusCode, message });
});

expressServer.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

export default () => expressServer;
