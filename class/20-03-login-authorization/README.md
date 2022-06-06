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
  - JWT, passport 설치 및 사용법 + yarn add @nestjs/passport
  - https://docs.nestjs.com/security/authentication#authentication
- 인가
  - 토큰을 주고 받을 때는 안전한 전달을 위해서 http 헤더의 Authorization 키에 넣어서 전달한다.
  - 리졸버에 가드 적용 -> common 폴더에 가드 만들기 -> 사용할 때는 module에 import
  - gql은 변형이 필요함 -> auth 폴더에 gql-auth-guards 생성 -> gql-user.param.ts 생성
