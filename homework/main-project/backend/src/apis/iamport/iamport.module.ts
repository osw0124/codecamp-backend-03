import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { IamportController } from './iamport.controller';
import { IamportService } from './iamport.service';

import { Payment } from '../payments/entities/payment.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Payment]), //
    // HttpModule.registerAsync({
    //   //axios request config
    //   // 모든 axios  request에 Async 설정
    //   useFactory: () => ({
    //     timeout: 5000,
    //     maxRedirects: 5,
    //   }),
    // }),
  ],
  providers: [
    IamportController, //
    IamportService,
  ],
})
export class IamportModule {}
