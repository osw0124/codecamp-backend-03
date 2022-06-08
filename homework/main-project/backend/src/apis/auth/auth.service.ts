import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import 'dotenv/config';

import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  getAccessToken({ user }) {
    this.UserRepository.update({ email: user.email }, { isLogin: true });

    return this.jwtService.sign(
      { email: user.email, id: user.id }, // 데이터
      { secret: process.env.AccessKey, expiresIn: '30s' }, // 생성 키, 유효기간
    );
  }

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, id: user.id },
      { secret: process.env.RefreshKey, expiresIn: '2w' },
    );

    res.setHeader('Set-Cookie', `refreshToken = ${refreshToken}; path=/;`);
  }
}
