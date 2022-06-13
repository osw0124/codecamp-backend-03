import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PointTransactionResolver } from './pointTransaction.resolver';
import { PointTransactionService } from './pointTransaction.service';

import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction, //
      User,
    ]),
  ],
  providers: [
    PointTransactionResolver, //
    PointTransactionService,
  ],
})
export class PointTransactionModule {}
