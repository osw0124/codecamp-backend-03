import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    // 인가 진행
    super({
      //   jwtFromRequest: (req) => {
      // req.headers.Authorization.replace('Bearer', '').trim();
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 위의 기능을 제공해주는 passport 메소드
      secretOrKey: process.env.AccessKey,
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
