//schema
import { Token } from "../models/tokenSchema.js";
//service
import { TokenService } from "../../services/token.service.js";
import { UtilService } from "../../services/util.service.js";
import { ValidateService } from "../../services/validate.service.js";

export class TokenController {
  startTokenAuth = async (req, res) => {
    const tokenService = new TokenService();
    const utilService = new UtilService();
    const validateService = new ValidateService();

    const receiverPhone = req.body.phone;
    const token = utilService.getToken();

    if (!validateService.checkValidationPhone(receiverPhone)) {
      res.status(404).send("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
      return;
    }
    if (!tokenService.findOneFromDB({ phone: receiverPhone })) {
      tokenService.createToken({ token: token, phone: receiverPhone });
    } else {
      tokenService.updateToken({ phone: receiverPhone }, { token: token });
    }

    tokenService.sendTokenToSMS(receiverPhone, token);

    res.status(201).send("핸드폰으로 인증 문자가 전송되었습니다!");
  };

  finishTokenAuth = async (req, res) => {
    const tokenService = TokenService();

    const receiverPhone = req.body.phone;
    const inputToken = req.body.token;

    const DBToken = tokenService.findOneFromDB({ phone: receiverPhone });

    if (!tokenService.tokenValueCheck(DBToken, inputToken)) {
      res.status(404).send(false);
      return;
    }

    if (currentDBToken.isAuth === false) {
      tokenService.updateToken({ phone: receiverPhone }, { isAuth: true });
      res.status(201).send(true);
      return;
    }
  };
}
