import coolsms from "coolsms-node-sdk";

import { Token } from "../mvc/models/tokenSchema.js";

export class TokenService {
  findOneFromDB = async ({ phone }) => {
    return await Token.findOne({ phone: phone });
  };
  createToken = async ({ token, phone }) => {
    await Token.create({ token: token, phone: phone });
  };
  updateToken = async ({ target, condition }) => {
    await Token.findOneAndUpdate({ ...target }, { ...condition });
  };
  sendTokenToSMS = async (receiver, token) => {
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    const mysms = coolsms.default;
    const messageService = new mysms(SMS_KEY, SMS_SECRET);

    const result = await messageService //질문
      .sendOne({
        to: `${receiver}`,
        from: SMS_SENDER,
        text: `요청하신 인증번호는 [${token}]입니다.`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };
  tokenValueCheck = (dbToken, inputToken) => {
    if (dbToken === null) {
      return false;
    } else if (dbToken !== inputToken) {
      return false;
    }
  };
}
