import { Module } from '@nestjs/common';

import { IamportController } from './iamport.controller';
import { IamportService } from './iamport.service';

@Module({
  imports: [],
  controllers: [IamportController], // 컨트롤러 안쓰는데 만들어서 등록해야함?
  providers: [IamportService],
  // 다른 모듈에서 현재 모둘에 있는 서비스(인스턴스?)를 사용할 수 있게 할려면 모듈에서 export해야 함
  // export하려면 providers에 등록해야함
  exports: [IamportService],
})
export class IamportModule {}
