import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller() //데코레이터
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'aaa' })
  login(data) {
    console.log(data);
    return 'login!!!';
  }
}
