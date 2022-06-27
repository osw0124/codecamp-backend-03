# 배포(Deploy)

#### **prod**

- 최종 배포를 받고 서비스를 운영한다

#### **stage**

- dev에서 prod로 배포되기 전에 연결 지점
- 최종 배포전에 필요한 테스트들을 진행한다

#### **dev**

- 팀 개발용

#### **local**

- 개인 개발용

#### **HA(High Availity)-고가용성 구성**

- 하나의 서버에 문제가 생겼을 때 다른 서버가 역할을 이어받아 서비스에 영향을 최소화 하는 구성

---

#### **Install**

```bash
sudo apt update
sudo apt install docker.io
sudo apt install docker-compose
```

#### **방화벽 해제**

///

#### **권한 변경**

```bash
sudo usermod -aG docker <계정이름>
```

#### **백그라운드에서 실행하기**

```bash
docker-compose -f <docker compose 파일이름> up -d
```

#### **백그라운드에서 실행한 docker 로그 확인하기**

```bash
docker-compose -f <실행한 docker compose 파일이름> logs
docker-compose -f <실행한 docker compose 파일이름> logs -f
docker-compose -f <실행한 docker compose 파일이름> logs -f --tail=100
docker-compose -f <실행한 docker compose 파일이름> logs -f --tail=100 <docker>
```

# Cloud Serive

- 원격지에 있는 서버를 빌려 서 서비스를 배포 운영할 수 있는 서비스 비용과 운영상의 편리함이 커서 많이 사용한다.
- 최근에는 멀티 클라우드 환경을 만들어서 서비스 장애를 대비한다.

# Cloud Serive Provider

#### 아마존

- AWS
  - 가장 점유율이 높음 => **커뮤니티가 크다**

#### 구글

- GCP
  - 상대적으로 비용이 저렴 **(상세 비교하면 각 서비스마다 특화된 부분이 있음)**

#### 마이크로 소프트

- Azure

# Google Cloud Platform

- Compute Engine => VM 인스턴스(EC2)
- GCPing => 세계에 있는 서버중에 현재 제일 반응이 빠른 서버를 찾아준다

# **git log를 돌면서 잘못 올린 파일 지우기**

- git filter-branch --tree-filter 'rm -f ./class/deploy-with-docker/backend/.env.dev' -f
- git filter-branch --tree-filter 'rm -f ./class/deploy-with-docker/backend/.env.stage' -f
- git filter-branch --tree-filter 'rm -f ./class/deploy-with-docker/backend/.env.prod' -f

# **Serverless service**

- 백엔드 서버없이 서비스하는 것 => Clooud Function과 같은 도구를 사용해서 기능을 클라우드 내에 생성한다
- 접속량이 많지않은 경우에 비용을 줄일 수 있는 수단

#### **한계**

- 첫 실행 때 vm인스턴스 생성에 시간이 걸린다(한번 생성되면 5~10초 정도 다음 요청을 기다린다) => **Cold Start**

# **GCP SQL 설정**

1. 설치
2. 데이터베이스 생성
3. 연결 설정 => 연결 허용 IP 등록 => 외부 접속 가능
4. docker compose 수정
5. appmodule typeOrmModule 연결 설정 수정
6. 보안을 위해서 VPC(Virtual Private Cloud) Peering 설정 => VPC 피어링??
   - 연결 설정 수정 (비공개 IP로 변경)
   - 연습 때는 default VPC에 들어가지만 일반적으로 다른VPC에 들어간다 ???

# **Cloud DNS**

1. DNS 영역 만들기 (발급받은 도매인 사용)
2. 구매 사이트 내임서버 주소 수정 (가비아 => GCP) (시간이 좀 걸림 가비아의 경우 일괄처리 되는 듯)
3. 레코드 세트 추가

# **인스턴스 그룹**

1. 비관리형 인스턴스 그룹 만들기

# **로드밸런서(부하분산)**

1. 부하 분산기 만들기

   - 프론트(Input)/백엔드(Output) 구성
   - Content Delivery Network
   - 헬스체커

     - 로드 밸런싱의 대상이 되는 백엔드 자원의 상태를 주기적으로 확인하는 도구
     - 기능이 없을 때는 TCP 프로토콜로 체크하는 것이 기본 (아래는 curl을 이용한 상태코드 확인)

       ```
       curl http://aaa.codecamp-deploy.com:3000/graphql -w "%{http_code}"
       ```

     - DNS 레코드 주소 로드밸런서 주소로 변경
