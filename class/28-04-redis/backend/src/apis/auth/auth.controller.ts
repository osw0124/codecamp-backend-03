import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<User, 'email' | 'password' | 'name' | 'age'>;
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
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 기존 가입 확인
    let user = await this.userService.findOne({ email: req.user.email });
    // 2. 회원가입
    if (!user) {
      user = await this.userService.create({
        email: req.user.email,
        hashedPassword: req.user.password,
        name: req.user.name,
        age: req.user.age,
      });
    }
    // 3. 로그인
    this.authService.setRefreshToken({ user, res });

    // 4. 리다이렉트
    res.redirect('http://localhost:5500/class/21-03-login-google/frontend/social.login.html');
  }
}