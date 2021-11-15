import mongoose from "mongoose";
require("dotenv").config();

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  if (!DB_URI) throw new Error("DB_URI is not reachable");
  await mongoose.connect(DB_URI);
};

export default connectDB;
