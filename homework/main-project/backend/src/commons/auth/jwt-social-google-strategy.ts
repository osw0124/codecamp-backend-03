import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';
import { CreateUserInput } from 'src/apis/users/dto/createUser.input';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // 인가 진행
    super({
      clientID: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }
  // 인가 성공
  validate(accessToken, refreshToken, profile) {
    const createUserInput: CreateUserInput = {
      email: profile.emails[0].value,
      password: profile.id,
      name: profile.displayName,
      phoneNumber: '010-0000-0000',
      birthDay: new Date('1900-01-01'),
    };
    return createUserInput;
  }
}
