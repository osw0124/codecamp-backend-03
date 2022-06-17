import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import 'dotenv/config';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
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
  async validate(req, payload) {
    // console.log('=================', req.headers);
    console.log('=================', req.headers.authorization);
    console.log('=================', req.headers.cookie);

    // const mycache = await this.cacheManager.get();
    // console.log(mycache);
    return {
      email: payload.email,
      id: payload.id,
    };
  }
}
