import { Module } from '@nestjs/common';
import { BoardResolver } from './boards.resolver';
import { BoardService } from './boards.service';

@Module({
  //   imports: [],//데이터 배이스 연결
  //   controllers: [],
  providers: [BoardResolver, BoardService],
})
export class BoardModule {}
