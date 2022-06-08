import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  getAccessToken({ hasUser }) {
    this.UserRepository.update({ email: hasUser.email }, { isLogin: true });

    return this.jwtService.sign(
      { email: hasUser.email, id: hasUser.id }, // 데이터
      { secret: 'myAccessKey', expiresIn: '1h' }, // 생성 키, 유효기간
    );
  }

 
}
