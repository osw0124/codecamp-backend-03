//schema
import { Token } from "../models/tokenSchema.js";
//service
import { TokenService } from "../../services/token.service.js";
import { UtilService } from "../../services/utils.service.js";

export class TokenController {
  startTokenAuth = async (req, res) => {
    const receiverPhone = req.body.phone;
    const token = UtilService.getToken();

    if (!TokenService.checkValidationPhone(receiverPhone)) {
      res.status(404).send("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
      return;
    }

    if (!(await Token.findOne({ phone: receiverPhone }))) {
      await Token.create({ token: token, phone: receiverPhone });
    } else {
      await Token.findOneAndUpdate({ phone: receiverPhone }, { token: token });
    }

    TokenService.sendTokenToSMS(receiverPhone, token);

    res.status(201).send("핸드폰으로 인증 문자가 전송되었습니다!");
  };

  finishTokenAuth = async (req, res) => {
    const receiverPhone = req.body.phone;
    const token = req.body.token;

    const currentDBToken = await Token.findOne({ phone: receiverPhone });
    if (currentDBToken === null) {
      res.status(404).send(false);
      return;
    }
    if (currentDBToken.token !== token) {
      res.status(404).send(false);
      return;
    }
    if (currentDBToken.isAuth === false) {
      await Token.updateOne({ phone: receiverPhone }, { isAuth: true });
      res.status(201).send(true);
      return;
    }
  };
}
