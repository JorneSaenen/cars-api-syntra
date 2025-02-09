import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(422).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    if (!token) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: "success",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        token: token,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "favorites"
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    if (!token) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        favorites: user.favorites,
        token: token,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ status: "success", message: "Logged out" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
