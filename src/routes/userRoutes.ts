import express from "express";
import { getUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:id", authMiddleware, getUser);

export default router;
