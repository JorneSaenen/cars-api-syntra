// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import connectToDb from "./config/database";
import vehicleRoutes from "./routes/vehicleRoutes";
import userRoutes from "./routes/userRoutes";
import { notFound } from "./controllers/notFoundController";
import { NODE_ENV, PORT } from "./config/env";

// Variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.all("*", notFound);

// Server Listening
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}! 🚀 (${NODE_ENV})`);
  await connectToDb();
});
