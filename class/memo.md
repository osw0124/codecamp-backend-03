# **serverless servie**

-   백엔드 서버없이 서비스하는 것 => Clooud Function과 같은 도구를 사용해서 기능을 클라우드 내에 생성한다
-   접속량이 많지않은 경우에 비용을 줄일 수 있는 수단

#### **한계**

-   첫 실행 때 vm인스턴스 생성에 시간이 걸린다(한번 생성되면 5~10초 정도 다음 요청을 기다린다) => **Cold Start**

# GCP SQL 설정

1. 설치
2. 데이터베이스 생성
3. 연결 설정 => 연결 허용 IP 등록 => 외부 접속 가능
4. docker compose 수정
5. appmodule typeOrmModule 연결 설정 수정
