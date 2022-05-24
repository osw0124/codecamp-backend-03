import { Token } from "../mvc/models/tokenSchema.js";

export class UserService {
  updateUser = async (condition, userInfo) => {
    await User.findOneAndUpdate({ ...condition }, { ...userInfo });
  };
  userSave = async (userInfo) => {
    await userInfo.save();
  };
}
