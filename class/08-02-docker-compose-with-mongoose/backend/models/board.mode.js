import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  writer: String,
  title: String,
  contents: String,
});

export const Board = mongoose.model("Board", BoardSchema);
