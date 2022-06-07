# Refresh 토큰

- AccessToken을 만들 때 같이 만들어서 전달한다.
- 유효기간
  - 2주에서 2달
- 쿠키에 저장
- AccessToken 에러시 restoreAccessToken
  - 인가 처리
  - 새로운 AccessToken을 생성 후 전달

---

- /src/apis/auth에 작성
- app.module에 context: ({ req, res }) => ({ req, res }) 추가

# Restore 토큰
