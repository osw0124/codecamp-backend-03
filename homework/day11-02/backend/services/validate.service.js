import { Token } from "../mvc/models/tokenSchema.js";

export class ValidateService {
  checkValidationPhone = (phone) => {
    if (myphone.length !== 10 && myphone.length !== 11) {
      return false;
    } else {
      return true;
    }
  };
}
