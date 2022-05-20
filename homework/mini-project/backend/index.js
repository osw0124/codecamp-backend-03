import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as cheerio from "cheerio";
import axios from "axios";

import { options } from "./swagger/config.js";
import { User } from "./models/userSchema.js";
import { Token } from "./models/tokenSchema.js";
import { Starbucks } from "./models/starbucksSchema.js";

const app = express();
const port = 3000;
``;
app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

async function scrapFaovritepage(prefer) {
  const url = prefer;
  const result = await axios.get(url);
  const $ = cheerio.load(result.data);

  $("meta").each((_, el) => {
    if ($(el).attr("preperty")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      console.log(key, value);
    }
  });
}

app.post("/user", async (req, res) => {
  const userReceiver = { ...req.body };
  const user = new User({
    name: userReceiver.name,
    email: userReceiver.email,
    personal: userReceiver.personal,
    prefer: userReceiver.prefer,
    pwd: userReceiver.pwd,
    phone: userReceiver.phone,
  });

  await user.save();

  // if (Token.findOne({ phone: user.phone }).isAuth) {
  //   scrapFaovritepage(prefer);
  // } else {
  //   res.status(422).send("에러! 핸드폰 번호가 인증되지 않았습니다");
  // }

  res.status(201).send();
});

//회원 목록 조회
app.get("/users", async (req, res) => {
  const users = await User.find();
  console.log(users);

  res.send();
});

//토큰 인증 요청
app.post("/tokens/phone", (req, res) => {
  res.send();
});

//토큰 인증 완료
app.patch("/tokens/phone", (req, res) => {
  res.send();
});

//스타벅스 커비 목록 조회
app.get("/starbucks", (req, res) => {
  res.send;
});

// mongoose.connect("mongodb://my-database:27017/miniProject");
mongoose.connect("mongodb://localhost:27017/miniProject");
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
