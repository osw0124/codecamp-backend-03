import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

export function createTokenOfPhone(myphone) {
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    const mytoken = getToken();

    sendTokenToSMS(myphone, mytoken);

    return mytoken;
  }
}
