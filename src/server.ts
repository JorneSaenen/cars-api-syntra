// Imports
import cors from "cors";
import express from "express";
import connectToDb from "./config/database";
import cookieParser from "cookie-parser";
import vehicleRoutes from "./routes/vehicleRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { notFound } from "./controllers/notFoundController";
import arcjetMiddleware from "./middleware/arcjetMiddleware";
import { NODE_ENV, PORT } from "./config/env";
import { Vehicle } from "./models/vehicleModel";
import localAuthMiddleware from "./middleware/localAuthMiddleware";

// Variables
const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(arcjetMiddleware);

// Routes
app.get("/", localAuthMiddleware, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.render("index", { vehicles });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.all("*", notFound);

// Server Listening
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}! 🚀 (${NODE_ENV})`);
  await connectToDb();
});
