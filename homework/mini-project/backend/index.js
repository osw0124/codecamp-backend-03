import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { options } from "./swagger/config.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.post("/user", (req, res) => {
  res.send();
});

//회원 목록 조회
app.get("/users", (req, res) => {
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
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
