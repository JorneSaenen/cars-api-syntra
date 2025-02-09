import express from "express";
import { getUser, getUsers } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getUsers).get("/:id", authMiddleware, getUser);

export default router;
