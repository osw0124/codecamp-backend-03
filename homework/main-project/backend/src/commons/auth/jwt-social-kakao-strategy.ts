import { PassportStrategy } from '@nestjs/passport';
import { Strategy as KaKaoStrategy } from 'passport-kakao';
import 'dotenv/config';
import { CreateUserInput } from 'src/apis/users/dto/createUser.input';

export class JwtKakaoStrategy extends PassportStrategy(KaKaoStrategy, 'kakao') {
  constructor() {
    // 인가 진행
    super({
      clientID: process.env.KakaoClientID,
      clientSecret: '',
      callbackURL: 'http://localhost:3000/login/kakao',
    });
  }
  // 인가 성공
  validate(accessToken, refreshToken, profile) {
    const createUserInput: CreateUserInput = {
      email: profile._json.kakao_account.email,
      password: profile.id,
      name: profile.username,
      phoneNumber: '010-0000-0000',
      birthDay: new Date('1900-01-01'),
    };
    return createUserInput;
  }
}
