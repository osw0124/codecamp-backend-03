# **키워드 검색**

- 보통 inverted Index(역색인) 방식을 이용한 검색이 많다 -> **Full-Text 검색**
  - 키워드가 포함된 문장, 대상 찾기
- 컨텐츠를 쪼개서 키워드로 저장한는 것 -> **토크나이징**
  - 쪼개서 나오는 키워드 -> **토큰**
- 대표적인 검색 엔진 -> **EleasticSearch**

# **ELK(Elastic Stack)**

## **ElasticSearch**

- 데이터들을 검색용으로 가공하고 저장해서 검색기능을 제공하는 도구
- 검색용으로 개발 되었지만 로그, 데이터 분석 등 다양한 영역에서 사용하고있다.
- Lucene(아파치 검색 라이브러리) 기반 Java 오픈소스 -> 사용하려면 Java를 설치해야한다.

  #### **install**

  ```
  yarn add @nestjs/elasticsearch
  yarn add @elastic/elasticsearch
  ```

  1. 모듈에 Elastic 모듈 추가
  2. resolver/controller에 의존성 주입

  #### **검색**

  ```bash
  curl -XGET "http://localhost:9200/myproduct03/_search?pretty" -H 'Content-Type: application/json' -d'
  {
  "query": {
  "match_all": {}
  }
  }'
  ```

  - 토크나이즈 결과에 따라 키워드가 검색이 되거나 안될 수 있다.
    - POST. url/<index이름>/\_analyze를 사용하면 토크나이즈 결과를 예상할 수 있다.
      ```json
      {
        "tokenizer": "standard",
        "text": "안녕하세요 Bestshop입니다! Best going"
      }
      ```
  - 보통 토크나이즈 과정과 함께 필터링이 같이 진행된다. => **Analyzer**

#### **Analyzer**

> Analyzer는 직접 만들고 사용할 수 있다 => 수많은 Analyzer가 있다!!

- standard
  - 특문제거 모든 문자 소문자 변환 등을 진행하는 디폴트 analyzer
- whitespace
  - 공백(띄어쓰기)만을 기준으로 토크나이징을 진행하는 analyzer
- keyword
  - 들어온 문장 전체를 그대로 적용한다.

#### **Settings vs Mappings**

- 사용하고 싶은 Analzer, Tokenizer, Filter를 미리 등록하는 것 => **Settings**
  - url/<index이름>/\_stteings로 확인할 수 있다
  - settings 등록
    ```json
    // PUT. http://localhost:9200/<index이름>/_settings
    {
      "settings": {
        "analysis": {
          "analyzer": {
            "my_ngram_analyzer": {
              "tokenizer": "my_ngram_tokenizer"
            }
          },
          "tokenizer": {
            "my_ngram_tokenizer": {
              "type": "nGram", //nGram은 기본제공되는 tokenizer다
              "min_gram": "1",
              "max_gram": "10"
            }
          }
        },
        "max_ngram_diff": "10" // min_gram과 max_gram의 차이, 이 설정이 없으면 기본설정 1로 설정된다.
      }
    }
    ```
    ```json
    {
      "analyzer": "my_ngram_analyzer",
      "text": "안녕하세요. Bestshop입니다! Best"
    }
    ```
  - 한 번 적용된 analysis 내용은 변경이 불가능하고, 이미 만들어진 Index에 Analyzer를 변경하거나 추가하기 위해서 Index를 _close한 후에 변경하고 다시 _open해주어야 한다.
    - POST. http://localhost:9200/<index이름>/\_close
    - POST. http://localhost:9200/<index이름>/\_open
- 어떤 칼럼을 어떤 Analyzer를 사용해서 분석할지 미리 설정하는 것 => **Mappings**

  - url/<index이름>/\_mappings로 확인할 수 있다
  - mappings 등록

    ```json
    // PUT. http://localhost:9200/<index이름>/_settings
    {
      "properties": {
        "name": {
          "type": "text"
        },
        "description": {
          "type": "text",
          "analyzer": "my_ngram_analyzer"
        },
        "price": {
          "type": "long"
        }
      }
    }
    ```

  - 한번 등록한 mappings는 변경이 불가능하며 추가는 가능하다.

#### **기타**

- bool query => 조건을 만족하는 결과를 찾아온다.
  ```json
  // POST. http://localhost:9200/<index이름>/_search
  {
    "query": {
      "bool": {
        "should": [{ "prefix": { "name": "최" } }, { "match": { "name": "best" } }] //조건을 여러 개 설정할 수 있다. or 조건으로 검색한다.
      }
    }
  }
  ```

## **Logstash**

- MySQL 등 다양한 데이터 저장 수단에서 검색대상이 될 데이터들을 가져오는 도구
- DB에서 데이터를 가져오는 과정에서 데이터를 필터링, 가공할 수 있다 -> **Filters**

#### **jdbc**

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

#### **install**

- jdbc 설치
- logstash.conf

## **Kibana**

- 시각화 도구
