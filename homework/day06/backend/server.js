import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import { options } from "./swagger/config.js";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/users", (req, res) => {
  const users = [
    {
      email: "aaa@gmail.com",
      name: "철수",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "bbb@gmail.com",
      name: "흰둥이",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ccc@gmail.com",
      name: "짱구",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "ddd@gmail.com",
      name: "원장선생님",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
    {
      email: "eee@gmail.com",
      name: "신형만",
      phone: "010-1234-5678",
      personal: "220110-2222222",
      prefer: "https://naver.com",
    },
  ];
  res.status(200).send(users);
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;
  // 1. 이메일이 정상인지 확인(1-존재여부, 2-"@"포함여부)
  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    // 2. 가입환영 템플릿 만들기
    const mytemplate = getWelcomeTemplate(user);

    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(user.email, mytemplate);

    res.send("가입완료!!");
  }
});

app.get("/starbucks", (req, res) => {
  const coffes = [
    { name: "아메리카노", kcal: 5 },
    { name: "라떼", kcal: 10 },
    { name: "돌체라떼", kcal: 20 },
    { name: "카페모카", kcal: 13 },
    { name: "카라멜 마끼야또", kcal: 30 },
    { name: "밀크쉐이크", kcal: 15 },
    { name: "밀크티", kcal: 30 },
    { name: "아샷추", kcal: 20 },
    { name: "콜드브루", kcal: 5 },
    { name: "자몽 에이드", kcal: 10 },
  ];

  res.status(200).send(coffes);
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.myphone;

  // // 1. 휴대폰번호 자릿수 맞는지 확인하기
  // const isValid = checkValidationPhone(myphone);
  // if (isValid) {
  //   // 2. 핸드폰 토큰 6자리 만들기
  //   const mytoken = getToken();

  //   // 3. 핸드폰번호에 토큰 전송하기
  //   sendTokenToSMS(myphone, mytoken);

  // }
  res.status(200).send("인증이 완료되었습니다.");
});

app.listen(3000, () => {
  console.log(`서버가 열렸습니다 -- ${Date()}`);
});
