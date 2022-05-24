// import { CashService } from "../../services/cash.service.js";

export class CouponController {
  constructor(moneyService) {
    this.moneyService = moneyService;
  }
  buyCoupon = () => {
    //1. 가진 돈을 검증하는 코드
    // const cashService = new CashService();
    const hasMoney = this.moneyService.checkValue(); // true or false

    //2. 쿠폰 구매 코드
    if (hasMoney) {
      res.send("쿠폰 구매 완료!!");
    }
  };
}
