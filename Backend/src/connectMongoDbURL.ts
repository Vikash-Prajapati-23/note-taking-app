import mongoose from "mongoose";

export async function connectToMongoDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully.!");
  } catch (error) {
    console.log("MongoDB connection failed.!", error);
  }
}
