# 패스워드 암호화

- bcrypt 사용

```bash
yarn add @types/bcrypt
```

```typescript
const hashedPassword = await bcrypt.hash(password, 11);
```
