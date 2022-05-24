import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  name: String,
  img: String,
});

export const Menu = mongoose.model("Menu", MenuSchema);
