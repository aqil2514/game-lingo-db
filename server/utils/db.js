import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.DATABASE_URI;

mongoose.connect(uri);
