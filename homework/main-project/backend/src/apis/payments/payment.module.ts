import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { IamportService } from '../iamport/iamport.service';

import { User } from '../users/entities/user.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [
    IamportService,
    TypeOrmModule.forFeature([
      Payment, //
      User,
    ]),
  ],
  providers: [
    PaymentResolver, //
    PaymentService,
  ],
})
export class PaymentModule {}
