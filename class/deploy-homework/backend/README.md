# 키워드 검색

- 보통 inverted Index(역색인) 방식을 이용한 검색이 많다 -> **Full-Text 검색**
  - 키워드가 포함된 문장, 대상 찾기
- 컨텐츠를 쪼개서 키워드로 저장한는 것 -> **토크나이징**
  - 쪼개서 나오는 키워드 -> **토큰**
- 대표적인 검색 엔진 -> **EleasticSearch**

# ELK(Elastic Stack)

## ElasticSearch

- 데이터들을 검색용으로 가공하고 저장해서 검색기능을 제공하는 도구
- 검색용으로 개발 되었지만 로그, 데이터 분석 등 다양한 영역에서 사용하고있다.
- Lucene(아파치 검색 라이브러리) 기반 Java 오픈소스 -> 사용하려면 Java를 설치해야한다.

  **install**

  ```
  yarn add @nestjs/elasticsearch
  yarn add @elastic/elasticsearch
  ```

  1. 모듈에 Elastic 모듈 추가
  2. resolver/controller에 의존성 주입

  **검색**

  ```
  curl -XGET "http://localhost:9200/myproduct03/_search?pretty" -H 'Content-Type: application/json' -d'
  {
  "query": {
  "match_all": {}
  }
  }'
  ```

## Logstash

- MySQL 등 다양한 데이터 저장 수단에서 검색대상이 될 데이터들을 가져오는 도구
- DB에서 데이터를 가져오는 과정에서 데이터를 필터링, 가공할 수 있다 -> **Filters**

**jdbc**

- Java Database Connectivity
- 자바로 작성된 인풋 플러그인
- mysql 처럼 jdbc interface를 지원하는 DB는 jdbc를 사용할 수 있다.

  ```json
  input {
      jdbc {
          jdbc_driver_library =>   // mysql Connector .jar 파일 설치 경로
          jdbc_driver_class => // mysql 드라이버 클래스
          jdbc_connection_string => // logstash에서 데이터를 가져올 DB 주소
          jdbc_user => // DB 로그인 유저
          jdbc_password => // DB 로그인 패스워드
          schedule => "* * * * *" // 분 시 일 월 년 # statement의 쿼리를 실행하는 주기 crontab과 같이 설정한다. 에시는 매 분마다 실행한다.
          use_column_value => true
          tracking_column => // 트래킹할 속성 설정
          tracking_column_type => // 트래킹할 속성의 타입
          last_run_metadata_path => // 트랙킹하고있는 속성을 기준으로 statement 결과의 마지막 값을 저장할 경로
          statement => // 데이터 요청 쿼리
      }
  }

  output {
      elasticsearch {
          hosts => "elasticsearch:9200" // elasticsearch 주소
          index => // 생성 할 index(Collection) 이름
      }
  }
  ```

**install**

- jdbc 설치
- logstash.conf

## Kibana

- 시각화 도구
