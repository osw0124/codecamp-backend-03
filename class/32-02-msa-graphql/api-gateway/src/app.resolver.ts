import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //데코레이터
export class AppController {
  constructor(private readonly appService: AppService) {}
}
