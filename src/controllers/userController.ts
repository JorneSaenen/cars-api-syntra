import { Request, Response } from "express";
import { User } from "../models/userModel";
import { getLicense } from "../utils/helpers";

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
    const { id } = req.params;

    if (id !== req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(id)
      .select("-password")
      .populate("favorites");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userFavoritesAndLicenses = user.favorites?.map((vehicle: any) => {
      if (vehicle.type === "motorcycle" && vehicle.cc) {
        return getLicense(vehicle);
      }
      return vehicle;
    });

    res.status(200).json({
      status: "success",
      data: { ...user.toObject(), favorites: userFavoritesAndLicenses },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const addToFavorites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vehicleId } = req.body;

    if (id !== req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!vehicleId) {
      res.status(400).json({ message: "vehicleId in the body is required!" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { favorites: vehicleId } },
      { new: true }
    );

    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const removeFromFavorites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { vehicleId } = req.body;

    if (id !== req.user?._id) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!vehicleId) {
      res.status(400).json({ message: "vehicleId in the body is required!" });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: vehicleId } },
      { new: true }
    );

    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
