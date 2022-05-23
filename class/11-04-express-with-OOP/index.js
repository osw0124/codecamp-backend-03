import express from "express";
import cors from "cors";

import { CashService } from "./services/cash.js";
import { ProductService } from "./services/product.js";

const app = express();

app.use(express.json());
app.use(cors());

//상품 구매하기
app.post("/products/buy", (req, res) => {
  //1. 가진 돈을 검증하는 코드
  const cashService = new CashService();
  const hasMoney = cashService.checkValue(); // true or false, 검증 기능은 is... or has...로 시작하는 경우가 많다.

  //2. 판매여부를 검증하는 코드 (중고 거래)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // true or false

  //3. 상품 구매 코드
  if (hasMoney && !isSoldout) {
    res.send("상품 구매 완료!!");
  }
});

//상품 환불하기
app.post("/products/refund", (req, res) => {
  //1. 판매여부를 검증하는 코드 (중고 거래)
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout(); // true or false

  //2. 상품을 환불하는 코드
  if (isSoldout) {
    res.status(200).send("상품 환불 완료!!");
  }
});

app.listen(3000, () => {
  console.log("Server On!!!! Linsten port 3000!!!");
});
