import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

export function createTokenOfPhone(myphone) {
  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone);
  if (isValid) {
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken();

    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken);

    return mytoken;
  }
}
