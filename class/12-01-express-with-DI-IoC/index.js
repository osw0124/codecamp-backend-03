import express from "express";
import cors from "cors";

import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./services/cash.service.js";
import { ProductService } from "./services/product.service.js";
import { PointService } from "./services/point.service.js";

const app = express();

const productService = new ProductService(); // new 한번으로 모든 곳에서 재사용 가능(싱글톤패턴)
const cashService = new CashService();
const pointService = new PointService(); //쿠폰구매 방식이 포인트결제로 변경됨
// const productService = new ProductService();

app.use(express.json());
app.use(cors());

//상품 API
const productControllerr = new ProductController(pointService, productService);
app.post("/products/buy", productControllerr.buyProduct); //상품 구매하기
app.post("/products/refund", productControllerr.refundProduct); //상품 환불하기

//쿠폰 API
const couponController = new CouponController(pointService);
app.post("/coupons/buy", couponController.buyCoupon); //쿠폰 구매하기

app.listen(7000, () => {
  console.log("Server On!!!! Linsten port 3000!!!");
});
