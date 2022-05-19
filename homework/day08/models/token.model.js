import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  token: String,
  phone: String,
  isAuth: { type: Boolean, default: false },
});

export const Auth = mongoose.model("Auth", AuthSchema);
