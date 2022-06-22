import { Query, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';

@Resolver() //데코레이터
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  fetchBoards() {
    return 'fetchBoards!!!';
  }
}
