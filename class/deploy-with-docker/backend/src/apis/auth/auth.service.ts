import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    console.log(user);
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, // 데이터
      { secret: process.env.AccessKey, expiresIn: '1h' }, // 생성 키, 유효기간
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, // 데이터
      { secret: process.env.RefreshKey, expiresIn: '2w' }, // 생성 키, 유효기간
    );

    //개발환경
    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken}; path=/;`); // 쿠키를 헤더로 프론트에 전송, path 설정 필수

    // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }
}
