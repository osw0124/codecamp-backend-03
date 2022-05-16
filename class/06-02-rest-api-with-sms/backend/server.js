// const express = require("express");
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";

import { createTokenOfPhone } from "../../01-05-token-count-api-facade-import/index.js";
import { options } from "./swagger/config.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
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

  res.status(200).send("인증이 완료되었습니다.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
