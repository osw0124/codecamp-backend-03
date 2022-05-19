import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  personal: String,
  prefer: String,
  pwd: { type: String, required: true },
  phone: { type: String, required: true },
  og: Object,
});

export const User = mongoose.model("User", UserSchema);
