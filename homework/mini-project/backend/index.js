import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { options } from "./swagger/config.js";
import { User } from "./models/userSchema.js";
import { Token } from "./models/tokenSchema.js";
import { Menu } from "./models/MenuShema.js";
import { checkValidationPhone, getToken, sendTokenToSMS, blindPersonamNumber } from "./feature/token.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./feature/email.js";
import { scrapFaovritepage } from "./feature/scraping.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

//회원 가입
app.post("/user", async (req, res) => {
  // const userReceiver = { ...req.body.userInfo };
  const userReceiver = { ...req.body };

  const user = new User({
    name: userReceiver.name,
    email: userReceiver.email,
    personal: blindPersonamNumber(userReceiver.personal),
    prefer: userReceiver.prefer,
    pwd: userReceiver.pwd,
    phone: userReceiver.phone,
  });

  const samePhoneUser = await User.findOne({ phone: user.phone });

  if (samePhoneUser !== null) {
    await User.findOneAndUpdate(
      { phone: user.phone },
      {
        name: userReceiver.name,
        email: userReceiver.email,
        personal: blindPersonamNumber(userReceiver.personal),
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

  if (!checkValidationEmail(user.email)) {
    res.status(404).send("에러 발생!!! 이메일을 제대로 입력해 주세요!!!");
    return;
  }

  const mailTemplate = getWelcomeTemplate(user.name, user.email);
  sendTemplateToEmail(user.email, mailTemplate);

  const createdUser = await User.findOne({ phone: user.phone });
  res.status(201).send(createdUser._id);
});

//회원 목록 조회
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.status(200).send(users);
});

//토큰 인증 요청
app.post("/tokens/phone", async (req, res) => {
  const receiverPhone = req.body.phone;
  const token = getToken();

  if (!checkValidationPhone(receiverPhone)) {
    res.status(404).send("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return;
  }

  if (!(await Token.findOne({ phone: receiverPhone }))) {
    await Token.create({ token: token, phone: receiverPhone });
  } else {
    await Token.findOneAndUpdate({ phone: receiverPhone }, { token: token });
  }

  sendTokenToSMS(receiverPhone, token);

  res.status(201).send("핸드폰으로 인증 문자가 전송되었습니다!");
});

//토큰 인증 완료
app.patch("/tokens/phone", async (req, res) => {
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
});

//스타벅스 커피 목록 조회
app.get("/starbucks", async (req, res) => {
  const coffeeList = await Menu.find();
  res.status(200).send(coffeeList);
});

mongoose.connect("mongodb://my-database:27017/miniProject");
// mongoose.connect("mongodb://localhost:27017/miniProject");
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
