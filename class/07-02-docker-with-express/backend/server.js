// const express = require("express");
import express from "express";
// import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";

// import { createTokenOfPhone } from "../../01-05-token-count-api-facade-import/index.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
// import { options } from "./swagger/config.js";

const app = express();
const port = 3000;

app.use(express.json());
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/boards", (req, res) => {
  //1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const result = [
    { number: 1, wirter: "철수", title: "제목입니다~", contents: "내용이에요!!" },
    { number: 2, wirter: "로직", title: "제목입니다~", contents: "내용이에요!!" },
    { number: 3, wirter: "흰둥이", title: "제목입니다~", contents: "내용이에요!!" },
  ];
  //2.꺼내온 결과 응답 주기
  res.status(200).send(result);
});

app.post("/boards", (req, res) => {
  console.log(req.body);
  //1.데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
  //2.저장 결과 메세지
  res.status(201).send({ msg: "게시물 등록에 성공하였습니다." });
});

app.post("/tokens/phone", (req, res) => {
  const myphone = req.body.myphone;
  const token = createTokenOfPhone(myphone);

  res.status(200).send({
    token: token,
    msg: "토큰을 받아주세요",
  });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
