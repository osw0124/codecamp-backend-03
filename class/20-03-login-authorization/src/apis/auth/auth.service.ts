import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken({ hasUser }) {
    return this.jwtService.sign(
      { email: hasUser.email, sub: hasUser.id }, // 데이터
      { secret: 'myAccessKey', expiresIn: '1h' }, // 생성 키, 유효기간
    );
  }
}
