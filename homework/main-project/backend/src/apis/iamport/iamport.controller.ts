import { Controller } from '@nestjs/common';
import { IamportService } from './iamport.service';

@Controller()
export class IamportController {
  constructor(
    private readonly IamportService: IamportService, //
  ) {}
}
