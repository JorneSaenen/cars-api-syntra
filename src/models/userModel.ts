import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png",
    },
    favorites: {
      type: [mongoose.Types.ObjectId],
      ref: "Vehicle",
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);
