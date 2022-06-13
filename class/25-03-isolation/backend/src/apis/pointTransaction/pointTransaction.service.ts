import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { PointTransaction, POINT_TRANSACTION_STATUS_ENUM } from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>, //
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    // transaction 시작!!
    await queryRunner.startTransaction();

    try {
      // 1. 테이블에 거래기록 작성
      const pointTransaction = this.pointTransactionRepository.create({
        // DB에 값을 실제로 저장하지 않는다 객체만 생성한다.
        impUid,
        amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointTransactionRepository.save(pointTransaction); // save, create 차이 연습용
      queryRunner.manager.save(pointTransaction); // query Runner를 사용하기 위해서는 DB와 관련된 작업을 queryRunner로 실행해야한다.

      // 2. 유저의 돈 찾아오기
      const user = await this.userRepository.findOne({ id: currentUser.id });

      // throw new Error('에러!!!');

      // 3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   { id: user.id }, //
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });

      await queryRunner.manager.save(updatedUser); //queryRunner로 실행한 작업만 rollback 가능하다.

      // commit 성공 확정!!
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트에 돌려주기
      return pointTransaction;
    } catch (error) {
      console.log(error);
      // 에러 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
    } finally {
      // 연결 해제 => 연결할 수 잇는 트랜젝션은 한계가 있다. 작업이 끝나면 해제해야한다.
      await queryRunner.release();
    }
  }
}
