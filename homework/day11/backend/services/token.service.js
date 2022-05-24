import coolsms from "coolsms-node-sdk";
import "dotenv/config";
import { User } from "../mvc/models/userSchema.js";

export class TokenService {
  checkValidationPhone = (myphone) => {
    if (myphone.length !== 10 && myphone.length !== 11) {
      return false;
    } else {
      return true;
    }
  };
  sendTokenToSMS = async (receiver, token) => {
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;
    console.log(process.env);

    const mysms = coolsms.default;
    const messageService = new mysms(SMS_KEY, SMS_SECRET);

    const result = await messageService
      .sendOne({
        to: `${receiver}`,
        from: SMS_SENDER,
        text: `요청하신 인증번호는 [${token}]입니다.`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  getToken = () => {
    const mycount = 6;
    if (mycount === undefined) {
      console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
      return;
    } else if (mycount <= 0) {
      console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
      return;
    } else if (mycount > 10) {
      console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
      return;
    }
    const result = String(Math.floor(Math.random() * 10 ** mycount)).padStart(mycount, "0");
    return result;
  };

  samePhoneUser = async ({ phone }) => {
    await User.findOne(phone);
  };
}
