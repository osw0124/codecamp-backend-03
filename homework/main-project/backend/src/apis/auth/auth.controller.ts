import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthGuard } from '@nestjs/passport';

import { CreateUserInput } from '../users/dto/createUser.input';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

//Request안에 user 타입을 CreateUserInput으로 덮어쓰기
interface IOAuthRequest extends Request {
  user: CreateUserInput;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google') // 엔드 포인트
  @UseGuards(AuthGuard('google')) // 구글 토큰 사용
  async loginGoogle(
    @Req() req: IOAuthRequest, //
    @Res() res: Response,
  ) {
    // 1. 기존 가입 확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입
    if (!user) {
      user = await this.userService.create({
        createUserInput: req.user,
      });
    }
    // 3. 로그인
    this.authService.setRefreshToken({ user, res });

    // 4. 리다이렉트
    res.redirect('http://localhost:5500/frontend/login/index.html');
    // res.redirect(
    //   'http://localhost:5500/class21-03-login-google/frontend/social-login.html',
    // );
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: IOAuthRequest, //
    @Res() res: Response,
  ) {
    // 1. 기존 가입 확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입
    if (!user) {
      user = await this.userService.create({
        createUserInput: req.user,
      });
    }

    // 3. 로그인
    this.authService.setRefreshToken({ user, res });

    // 4. 리다이렉트
    res.redirect('http://localhost:5500/frontend/login/index.html');
    // res.redirect(
    //   'http://localhost:5500/class21-03-login-google/frontend/social-login.html',
    // );
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: IOAuthRequest, //
    @Res() res: Response,
  ) {
    // 1. 기존 가입 확인
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입
    if (!user) {
      user = await this.userService.create({
        createUserInput: req.user,
      });
    }
    // 3. 로그인
    this.authService.setRefreshToken({ user, res });

    // 4. 리다이렉트
    res.redirect('http://localhost:5500/frontend/login/index.html');
    // res.redirect(
    //   'http://localhost:5500/class21-03-login-google/frontend/social-login.html',
    // );
  }
}
