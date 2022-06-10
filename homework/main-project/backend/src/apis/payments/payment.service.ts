import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import 'dotenv/config';
import axios from 'axios';

import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/payment.entity';
import { IamportService } from '../iamport/iamport.service';

import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentService {
  // private readonly iamportService: IamportService,
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser }) {
    ///////////////////////////////////////////////////////////
    //결제 검증 기능

    // 1. 아임 포트에서 엑세스 토큰 받아오기
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_API_KEY, // REST API키
        imp_secret: process.env.IMP_API_SECRET, // REST API Secret
      },
    });

    const impAccessToken = getToken.data.response;

    if (!impAccessToken) throw new UnprocessableEntityException();

    // 2. 아임포트 엑세스 토큰을 이용해서 결제정보 조회
    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${impUid}`,
      method: 'get',
      headers: { Authorization: impAccessToken.access_token },
    });

    const paymentData = getPaymentData.data.response;

    if (!paymentData) throw new UnprocessableEntityException();

    // 3. payment테이블에 같은 결제건이 있다면 ConflictException에러 반환
    const hasPaymentData = await this.paymentRepository.findOne({
      impUid: paymentData.imp_uid,
    });

    if (hasPaymentData) throw new ConflictException();

    //다른 검증이 필요하다면 추가

    ///////////////////////////////////////////////////////////

    // 1. 테이블에 거래기록 작성
    const payment = this.paymentRepository.create({
      // DB에 값을 실제로 저장하지 않는다 객체만 생성한다.
      impUid,
      merchantUid: paymentData.merchant_uid,
      amount,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      user: currentUser,
    });

    const result = await this.paymentRepository.save(payment); // save, create 차이 연습용

    // 2. 유저의 돈 찾아오기
    const user = await this.userRepository.findOne({ id: currentUser.id });

    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      { id: user.id }, //
      { point: user.point + amount },
    );

    // 4. 최종결과 프론트에 돌려주기
    return payment;
  }

  async cancel({ merchantUid, cancelAmount, reason, currentUser }) {
    ///
    const isCancled = await this.paymentRepository.findOne({ merchantUid });

    // 1. 결제 테이블에서 이미 취소되었다면 에러 반환
    if (isCancled.status === 'CANCEL') throw new UnprocessableEntityException();

    // 2. 엑세스 토큰 요청
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.IMP_API_KEY, // REST API키
        imp_secret: process.env.IMP_API_SECRET, // REST API Secret
      },
    });

    const accessToken = getToken.data.response.access_token;

    if (!accessToken) throw new UnprocessableEntityException();

    // 3. 결제 정보 조회
    const payments = await this.paymentRepository.find({ merchantUid });

    if (!payments) throw new UnprocessableEntityException();

    const { impUid, amount, canceldAmount } = payments[0];
    const cancelableAmount = amount - cancelAmount;

    if (cancelableAmount <= 0) {
      throw new ConflictException('이미 전액환불된 주문입니다!!!');
    }

    try {
      const getCancelData = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          reason, // 가맹점 클라이언트로부터 받은 환불사유
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
          amount: cancelAmount, // 가맹점 클라이언트로부터 받은 환불금액
          checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
        },
      });

      const { response } = getCancelData.data; // 환불 결과

      console.log('================', response);
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('환불 실패!!!');
    }

    const payment = this.paymentRepository.create({
      // DB에 값을 실제로 저장하지 않는다 객체만 생성한다.
      impUid,
      merchantUid,
      amount: -amount,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      user: currentUser,
    });

    const result = await this.paymentRepository.save(payment);

    return result;
    // this.paymentRepository.findOne({ merchantUid });
  }
}
