import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Payment,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/payment.entity';

import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser }) {
    console.log(impUid, amount, currentUser);
    // 1. 테이블에 거래기록 작성
    const payment = this.paymentRepository.create({
      // DB에 값을 실제로 저장하지 않는다 객체만 생성한다.
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      user: currentUser,
    });
    console.log(payment);

    const result = await this.paymentRepository.save(payment); // save, create 차이 연습용
    console.log(result);
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
}
