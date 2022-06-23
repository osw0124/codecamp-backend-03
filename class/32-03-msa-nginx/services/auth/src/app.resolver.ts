import { Query, Mutation, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';

@Resolver() //데코레이터
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  aaa() {
    return 'aaa';
  }

  @Mutation(() => String)
  login() {
    return 'login success!!!!';
  }
}
