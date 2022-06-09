import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    // 인가 진행
    super({
      //   jwtFromRequest: (req) => {
      // req.headers.Authorization.replace('Bearer', '').trim();
      //   },
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');

        return refreshToken;
      }, // 위의 기능을 제공해주는 passport 메소드
      secretOrKey: 'myRefreshKey',
    });
  }
  // 인가 성공
  validate(payload) {
    console.log(payload); // 토큰만들 때 바디에 넣었던 객체를 볼 수 있다.
    // return은 req.user로 들어간다.
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
