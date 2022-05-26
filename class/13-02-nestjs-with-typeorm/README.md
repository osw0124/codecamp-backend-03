# **graphQL on Nestjs**

## **스키마 First vs 코드 First**

- 스키마 First
  - typeDefs를 직접 하나하나 작성하는 방식
  - API(resolver == controller), API-Docs(Query, typeDefs)
- 코드 First
  - **Nestjs**에서는 API-Docs를 자동생성되게 설정할 수 있다.
- github 참고
  - main.ts: index.js
  - app.modules.ts: main.ts와 연동, API, GraphQL 설정
  - .resolver: controller
  - .service: service
  - .module: ????
- 기타
  - prettier 설정
    - 최상위 루트에 .vscode/settings.json 디렉토리 참고
    - vscode의 기본설정을 파일로 만들고 공유할 수 있다.
- ORM 사용(typeorm)

---

1. Nest 설치(nest로 새 프로젝트 생성)
   - npx nest new **project name**
2. graphql 등 설치 //GraphQL Installation 참고
   - yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
3. sample 코드에 따라 graphQL 구조 만들기
   - 아래 링크 참고
4. typeORM 설치
   - yarn add --save @nestjs/typeorm typeorm@0.2 mysql2
5. app.module 설정 // Docs 참고, 싱크로나이즈 주의!!
6. 테이블 생성, 연결(export, import)
7. DBeaver 연결 DB 생성, 테이블 확인
8. GraphQL을 같이 사용하기 위한 설정
   - 아래 링크 참고
   - typeORM 사용

---

### GraphQL

- app.module 설정 -> Entity 생성 -> dto input type 생성 -> api생성(resolver) -> service만들기 -> resolver완성

---

### **참고**

- https://docs.nestjs.com/techniques/database
- https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first
- https://docs.nestjs.com/graphql/quick-start
- https://docs.nestjs.com/graphql/federation
