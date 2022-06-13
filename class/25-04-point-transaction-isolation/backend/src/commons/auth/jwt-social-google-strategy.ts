import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import 'dotenv/config';

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
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    // return은 req.user로 들어간다.
    return {
      email: profile.emails[0].value,
      password: '393199fh3f93f',
      name: profile.displayname,
      age: 0,
    };
  }
}
