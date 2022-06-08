import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import 'dotenv/config';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    // 인가 진행
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');

        return refreshToken;
      },
      secretOrKey: process.env.RefreshKey,
    });
  }
  // 인가 성공
  validate(payload: any) {
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
