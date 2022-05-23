import express from "express";
import cors from "cors";

import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";

const app = express();

app.use(express.json());
app.use(cors());

//상품 API
const productControllerr = new ProductController();
app.post("/products/buy", productControllerr.buyProduct); //상품 구매하기
app.post("/products/refund", productControllerr.refundProduct); //상품 환불하기

//쿠폰 API
const couponController = new CouponController();
app.post("/coupons/buy", couponController.buyCoupon); //쿠폰 구매하기

app.listen(3000, () => {
  console.log("Server On!!!! Linsten port 3000!!!");
});
