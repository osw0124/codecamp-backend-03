import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  name: String,
  date: Date,
  endPrice: Number,
});

export const Stock = mongoose.model("Stock", StockSchema);
