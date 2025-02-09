import express from "express";
import {
  addToFavorites,
  getUser,
  getUsers,
  removeFromFavorites,
} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router
  .get("/", getUsers)
  .get("/:id", authMiddleware, getUser)
  .post("/add-to-favorites/:id", authMiddleware, addToFavorites)
  .delete("/remove-from-favorites/:id", authMiddleware, removeFromFavorites);

export default router;
