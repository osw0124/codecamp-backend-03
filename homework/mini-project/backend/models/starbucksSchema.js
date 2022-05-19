import mongoose from "mongoose";

const StarbucksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: String,
});

export const Starbucks = mongoose.model("Starbucks", StarbucksSchema);
