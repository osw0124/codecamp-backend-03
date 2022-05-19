import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  phone: { type: String, required: true },
  isAuth: { type: Boolean, default: false },
});

export const Token = mongoose.model("Token", TokenSchema);
