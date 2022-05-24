//schema
import { User } from "../models/userSchema.js";
import { Token } from "../models/tokenSchema.js";

//service
import { EmailService } from "../../services/email.service.js";
import { UtilService } from "../../services/utils.service.js";
import { TokenService } from "../../services/token.service.js";
import { scrapFaovritepage } from "../../services/scraping.service.js";

export class UserController {
  tokenService = new TokenService();
  signUp = async (req, res) => {
    // const userReceiver = { ...req.body.userInfo }; //html
    const userReceiver = { ...req.body }; //postman
    const utilService = new UtilService();
    const emailService = new EmailService();

    const user = new User({
      name: userReceiver.name,
      email: userReceiver.email,
      personal: utilService.blindPersonalNumber(userReceiver.personal),
      prefer: userReceiver.prefer,
      pwd: userReceiver.pwd,
      phone: userReceiver.phone,
    });

    samePhoneUser = tokenService.samePhoneUser({ phone: user.phone });

    if (samePhoneUser !== null) {
      await User.findOneAndUpdate(
        { phone: user.phone },
        {
          name: userReceiver.name,
          email: userReceiver.email,
          personal: utilService.blindPersonalNumber(userReceiver.personal),
          prefer: userReceiver.prefer,
          pwd: userReceiver.pwd,
          phone: userReceiver.phone,
        }
      );
    } else {
      await user.save();
    }

    const samePhoneToken = await Token.findOne({ phone: user.phone });
    if (samePhoneToken.isAuth) {
      const ogInfo = await scrapFaovritepage(user.prefer);
      await User.findOneAndUpdate({ phone: user.phone }, { og: ogInfo });
    } else {
      res.status(422).send("에러! 핸드폰 번호가 인증되지 않았습니다");
      return;
    }

    if (!emailService.checkValidationEmail(user.email)) {
      res.status(404).send("에러 발생!!! 이메일을 제대로 입력해 주세요!!!");
      return;
    }

    const mailTemplate = emailService.getWelcomeTemplate(user.name, user.email);
    emailService.sendTemplateToEmail(user.email, mailTemplate);

    const createdUser = await User.findOne({ phone: user.phone });
    res.status(201).send(createdUser._id);
  };

  findUsers = async (req, res) => {
    const users = await User.find();

    res.status(200).send(users);
  };
}
