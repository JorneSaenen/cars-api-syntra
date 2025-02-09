import { Request, Response } from "express";
import { User } from "../models/userModel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password").populate("favorites");
    res.status(200).json({ status: "success", data: users });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // TODO: check in middleware if user is logged in and it is this user.

    const { id } = req.params;
    const user = await User.findById(id)
      .select("-password")
      .populate("favorites");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ status: "success", data: user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
