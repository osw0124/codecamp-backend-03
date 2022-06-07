import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ user }) {
    console.log(user);
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, // 데이터
      { secret: 'myAccessKey', expiresIn: '20s' }, // 생성 키, 유효기간
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id }, // 데이터
      { secret: 'myRefreshKey', expiresIn: '2w' }, // 생성 키, 유효기간
    );

    //개발환경
    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken}`); // 쿠키를 헤더로 프론트에 전송

    // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }
}
