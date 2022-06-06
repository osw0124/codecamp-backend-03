import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly useService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    const hasUser = await this.useService.findOne({ email });

    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!hasUser) throw new UnprocessableEntityException('등록되지 않은 이메일입니다!!');

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면? 에러 던지기
    const isAuth = await bcrypt.compare(password, hasUser.password);
    if (!isAuth) throw new UnprocessableEntityException('잘못된 비밀번호입니다!!');

    // 4. 완전히 일치하는 유저가 있으면 accessToekn만들어서 브라우저에 전달하기
    return this.authService.getAccessToken({ hasUser });
  }
}
