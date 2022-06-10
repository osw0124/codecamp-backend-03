import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { HttpService } from '@nestjs/axios';
// import { AxiosResponse } from 'axios';
import axios from 'axios';

import { Payment } from '../payments/entities/payment.entity';
// import { Observable } from 'rxjs';

@Injectable()
export class IamportService {
  //   constructor() // private readonly paymentRepository: Repository<Payment>, // private readonly httpService: HttpService, // @InjectRepository(Payment)
  //   {}
  //   getIamportToken({ imp_api_key, imp_secret }) {
  //     const result = this.httpService.post(
  //       'https://api.iamport.kr/users/getToken',
  //       { imp_api_key, imp_secret },
  //     );
  //     console.log(result);
  //     return result;
  //   }
  //   getToken({ imp_api_key, imp_secret }) {
  //     const result = axios({
  //       url: 'https://api.iamport.kr/users/getToken',
  //       method: 'post', // POST method
  //       headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
  //       data: {
  //         imp_key: imp_api_key, // REST API키
  //         imp_secret: imp_secret, // REST API Secret
  //       },
  //     });
  //     console.log(result);
  //   }
}

// https://stackoverflow.com/questions/52972616/add-headers-httprequest-in-nestjs
// https://jakekwak.gitbook.io/nestjs/techniques/http-module
