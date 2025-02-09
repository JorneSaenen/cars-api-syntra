import mongoose from "mongoose";
import { Vehicle } from "../models/vehicleModel";
import { data } from "./data";
import { MONGO_URI } from "../config/env";

const seedDatabase = async () => {
  try {
    mongoose.connect(MONGO_URI! as string);
    // Clear existing data
    await Vehicle.deleteMany();

    // Insert sample users
    await Vehicle.insertMany(data);
    console.log("Database seeded successfully! 🌱");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

await seedDatabase();
