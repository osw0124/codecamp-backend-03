import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import * as bcrypt from 'bcrypt';

import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth-guards';
import { CurrentUser } from 'src/commons/auth/gql-user-param';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService, //
    private readonly userService: UserService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const hasUser = await this.userService.findOne({ email });

    if (!hasUser)
      throw new UnprocessableEntityException('등록되지 않은 이메일입니다!!');

    const isAuth = await bcrypt.compare(password, hasUser.password);
    if (!isAuth)
      throw new UnprocessableEntityException('잘못된 비밀번호입니다!!');

    this.authService.setRefreshToken({ user: hasUser, res: context.res });

    return this.authService.getAccessToken({ user: hasUser });
  }

  @Mutation(() => String)
  logout(
    @Context() context: any, //
  ) {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    const refreshToken = context.req.headers.cookie.split('=')[1];

    //토큰 검증
    const isValidation = this.authService.validationToken({
      accessToken,
      refreshToken,
    });

    // console.log('isValidation', isValidation);
    if (isValidation) {
      const isSave = this.authService.saveToken({ accessToken, refreshToken });

      if (isSave) {
        return '로그아웃에 성공했습니다.';
      }
    }

    return '로그아웃 실패!!';
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
