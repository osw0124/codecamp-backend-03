import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'MyAuthGuard',
) {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AccessKey,
      passReqToCallback: true,
    });
  }
  async validate({ req, payload }) {
    const accessToken = req.headers.authorization.split(' ')[1];

    const hasToken = await this.cacheManager.get(`accessToken:${accessToken}`);

    if (hasToken) {
      throw new UnauthorizedException('로그인 해주세요');
    }
    return {
      email: payload.email,
      id: payload.id,
    };
  }
}
