import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller() //데코레이터
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'bbb' })
  fetchBoards(data) {
    console.log(data);
    return 'fetchBoards!!!';
  }
}
