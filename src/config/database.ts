import mongoose from "mongoose";

const connectToDb = async () => {
  // Database connection
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connection OK");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectToDb;
