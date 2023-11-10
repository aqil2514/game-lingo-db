import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: String,
  password: String,
});

export const Users = mongoose.model("users", schema);
