import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy as NaverStrategy,
  Profile as NaverProfile,
} from 'passport-naver-v2';
import 'dotenv/config';
import { CreateUserInput } from 'src/apis/users/dto/createUser.input';

export class JwtNaverStrategy extends PassportStrategy(NaverStrategy, 'naver') {
  constructor() {
    // 인가 진행
    super({
      clientID: process.env.NaverClientID,
      clientSecret: process.env.NaverClientSecret,
      callbackURL: 'http://localhost:3000/login/naver',
    });
  }
  // 인가 성공
  validate(accessToken: string, refreshToken: string, profile: NaverProfile) {
    const createUserInput: CreateUserInput = {
      email: profile.email,
      password: profile.id,
      name: profile.name,
      phoneNumber: profile.mobile,
      birthDay: new Date(String(profile.birthYear + '-' + profile.birthday)),
    };
    return createUserInput;
  }
}
