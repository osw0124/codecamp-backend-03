import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';

export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'MyAuthGuard',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AccessKey,
    });
  }
  validate(payload) {
    return {
      email: payload.email,
      id: payload.id,
    };
  }
}
