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
