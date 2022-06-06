# 패스워드 암호화

- bcrypt 사용

```bash
yarn add @types/bcrypt
```

```typescript
const hashedPassword = await bcrypt.hash(password, 11);
```

- 인증
  - passport + JWT
  - JWT, passport 설치 및 사용법
  - https://docs.nestjs.com/security/authentication#authentication
- 인가
  - 토큰을 주고 받을 때는 안전한 전달을 위해서 http 헤더의 Authorizatoin 키에 넣어서 전달한다.
