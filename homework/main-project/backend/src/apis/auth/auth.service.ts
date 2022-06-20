import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { Cache } from 'cache-manager';
import 'dotenv/config';

import { User } from '../users/entities/user.entity';

// interface IlogoutToken {
//   email: string;
//   id: string;
//   iat: number;
//   exp: number;
// }

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  getAccessToken({ user }) {
    this.UserRepository.update({ email: user.email }, { isLogin: true });

    return this.jwtService.sign(
      { email: user.email, id: user.id }, // 데이터
      { secret: process.env.AccessKey, expiresIn: '1h' }, // 생성 키, 유효기간
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret: process.env.RefreshKey, expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken}; path=/;`);
  }

  validationToken({ accessToken, refreshToken }) {
    try {
      jwt.verify(accessToken, process.env.AccessKey);
      jwt.verify(refreshToken, process.env.RefreshKey);

      // console.log('=====', verifyAccess, verifyRefresh);
      return true;
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 엑세스 토큰입니다', error);
    }
  }

  async saveToken({ accessToken, refreshToken }) {
    const verifyAccess: any = jwt.verify(accessToken, process.env.AccessKey);
    const verifyRefresh: any = jwt.verify(refreshToken, process.env.RefreshKey);

    try {
      // 토큰 저장
      const saveAccess = await this.cacheManager.set(
        `accessToken:${accessToken}`,
        'accessToken',
        {
          ttl: verifyAccess.exp - verifyAccess.iat,
        },
      );

      const saveRefresh = await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: verifyRefresh.exp - verifyRefresh.iat,
        },
      );

      if (saveAccess === 'OK' && saveRefresh === 'OK') return true;
    } catch (error) {
      throw new ConflictException('토큰을 저장하지 못했습니다!!', error);
    }
  }
}
