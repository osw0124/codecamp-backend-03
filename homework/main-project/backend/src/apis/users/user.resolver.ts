import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth-guards';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  fetchUser(@Args('email') email: string) {
    return this.userService.findOne({ email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchLoginUsers() {
    return this.userService.findLoginUser();
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string, //
    @Args('updateUserInput')
    updateUserInput: UpdateUserInput,
  ) {
    await this.userService.checkModel({ userId });
    return this.userService.update({
      userId,
      updateUserInput,
    });
  }

  @Mutation(() => String)
  async updateUserPwd(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('changePassword') changePassword: string,
  ) {
    // 1. 계정 확인
    const user = await this.userService.hasUser({ email });
    // 2. 비밀번호 확인
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth)
      throw new UnprocessableEntityException('잘못된 비밀번호입니다!!');

    return await this.userService.updateUserPwd({
      email,
      changePassword,
    });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    return this.userService.delete({ userId });
  }

  @Mutation(() => Boolean)
  restoreUser(@Args('userId') userId: string) {
    return this.userService.restore({ userId });
  }

  @Mutation(() => Boolean)
  deleteLoginUser(@Args('email') email: string) {
    return this.userService.deleteLoginUser({ email });
  }
}
