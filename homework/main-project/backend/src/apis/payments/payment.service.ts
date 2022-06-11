import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import 'dotenv/config';

import { IamportService } from '../iamport/iamport.service';

import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/payment.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentService {
  // private readonly iamportService: IamportService,
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly iamportService: IamportService,
  ) {}

  async create({ impUid, amount, currentUser }) {
    ///////////////////////////////////////////////////////////
    //결제 검증 기능

    // 1. 아임 포트에서 엑세스 토큰 받아오기
    const impAccessToken = (await this.iamportService.getToken()).data.response;

    if (!impAccessToken) throw new UnprocessableEntityException();

    // 2. 아임포트 엑세스 토큰을 이용해서 결제정보 조회
    const paymentData = await (
      await this.iamportService.getPaymentData({ impUid, impAccessToken })
    ).data.response;

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

    await this.paymentRepository.save(payment); // save, create 차이 연습용

    // 2. 유저의 돈 찾아오기
    const user = await this.userRepository.findOne({ id: currentUser.id });

    // 3. 유저의 포인트 업데이트
    await this.userRepository.update(
      { id: user.id }, //
      { point: user.point + amount },
    );

    // 4. 최종결과 프론트에 돌려주기
    return payment;
  }

  async cancel({ merchantUid, cancelAmount, reason, currentUser }) {
    // // 1. 결제 테이블에서 이미 취소되었다면 에러 반환
    // const isCancled = await this.paymentRepository.findOne({ merchantUid });

    // if (isCancled.status === 'CANCEL') throw new UnprocessableEntityException();

    // 1. 엑세스 토큰 요청
    const impAccessToken = (await this.iamportService.getToken()).data.response
      .access_token;

    if (!impAccessToken) throw new UnprocessableEntityException();

    // 2. 사용자 포인트 조회
    const user = await this.userRepository.findOne({ id: currentUser.id });

    if (!user) throw new UnauthorizedException('로그인하고 사용해주세요!!!');

    // 3. 최소금액 확인
    if (cancelAmount < 100) {
      throw new BadRequestException('환불은 100원 이상부터 가능합니다.'); //정확한 금액과 정책 확인 필요
    }

    // 4. 환불 가능 금액 계산
    const cancelableAmount = user.point - cancelAmount;

    if (cancelableAmount <= 0) {
      throw new UnprocessableEntityException(
        '환불이 불가능 합니다. 이미 전액 환불 되었습니다!!!',
      );
    }

    // 5. merchntUid가 같은 결제 기록 조회
    const payments = await this.paymentRepository.find({ merchantUid });
    const { impUid, amount, canceledAmount } = payments[0];

    // 6. 아임포트에 환불신청
    const cancelResult = await this.iamportService.paymentCancel({
      impAccessToken,
      impUid,
      reason,
      cancelAmount,
      cancelableAmount,
    });

    console.log('환불결과:', cancelResult); //지금 당장 쓸일이 없고 빈 값만 들어오긴하는데 어디 쓸일이 있지 않을까?

    // 7. DB에 화불 기록 저장
    const payment = this.paymentRepository.create({
      // DB에 값을 실제로 저장하지 않는다 객체만 생성한다.
      impUid,
      merchantUid,
      amount: -cancelAmount,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      user: currentUser,
    });

    // 8. 유저의 포인트 업데이트
    await this.userRepository.update(
      { id: user.id }, //
      { point: user.point - cancelAmount },
    );

    const result = await this.paymentRepository.save(payment);

    return result;
  }
}
