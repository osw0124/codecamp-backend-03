import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guards';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUser(@CurrentUser() currentUser: any) {
    console.log('fetchUser 실행 완료!!');
    console.log('유저정보는???', currentUser);
    return 'lsdjlsdjfkos';
  }

  // @Query(() => [User])
  // fetchUsers() {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 11);
    return this.userService.create({ email, hashedPassword, name, age });
  }
}
