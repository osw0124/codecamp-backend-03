import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import 'dotenv/config';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    // 인가 진행
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');

        return refreshToken;
      },
      secretOrKey: process.env.RefreshKey,
      passReqToCallback: true,
    });
  }
  // 인가 성공
  async validate({ req, payload }) {
    const refreshToken = req.headers.cookie.split('=')[1];

    const hasToken = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );

    if (hasToken) {
      throw new UnauthorizedException('로그인 해주세요');
    }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
