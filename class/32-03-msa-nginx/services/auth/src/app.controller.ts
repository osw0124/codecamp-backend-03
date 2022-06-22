import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //데코레이터
export class AppController {
  // constructor(appService) {
  //   this.appService = appService;
  // }
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
