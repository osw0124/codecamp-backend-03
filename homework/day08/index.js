import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import cors from "cors";
import mongoose from "mongoose";

import { createTokenOfPhone } from "./phoneServer.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import { options } from "./swagger/config.js";
import { Board } from "./models/board.model.js";
import { Auth } from "./models/token.model.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.get("/boards", async (req, res) => {
  const result = await Board.find();

  res.status(200).send(result);
});

app.post("/boards", async (req, res) => {
  const board = new Board({
    writer: req.body.writer,
    title: req.body.title,
    contents: req.body.contents,
  });
  await board.save();

  res.status(201).send({ msg: "게시물 등록에 성공하였습니다." });
});

app.post("/tokens/phone", async (req, res) => {
  const myphone = req.body.myphone;
  const token = createTokenOfPhone(myphone);

  const check = await Auth.findOne({ phone: myphone });

  if (check !== null) {
    await Auth.findOneAndUpdate({ phone: myphone }, { token: token });
  } else {
    const auth = new Auth({
      token: token,
      phone: myphone,
    });
    await auth.save();
  }

  res.status(200).send(`${myphone}으로 인증 문자가 전송되었습니다`);
});

app.patch("/tokens/phone", async (req, res) => {
  const token = req.body.token;
  const myphone = req.body.myphone;

  const phoneCheck = await Auth.findOne({ phone: myphone });
  if (phoneCheck === null) {
    res.send(false);
  }

  const tokenCheck = await Auth.find({ phone: myphone, token: token });
  if (tokenCheck.length !== 0) {
    await Auth.findOneAndUpdate({ phone: myphone }, { isAuth: true });
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post("/users", (req, res) => {
  const user = req.body.myuser;

  const isValid = checkValidationEmail(user.email);
  if (isValid) {
    const mytemplate = getWelcomeTemplate(user);

    sendTemplateToEmail(user.email, mytemplate);

    res.send("가입완료!!");
  }
});

mongoose.connect("mongodb://my-database:27017/myproject03");
// mongoose.connect("mongodb://localhost:27017/myproject03");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
