# 키워드 검색

- 보통 inverted Index(역색인) 방식을 이용한 검색이 많다 -> **Full-Text 검색**
  - 키워드가 포함된 문장, 대상 찾기
- 컨텐츠를 쪼개서 키워드로 저장한는 것 -> **토크나이징**
  - 쪼개서 나오는 키워드 -> **토큰**
- 대표적인 검색 엔진 -> **EleasticSearch**

# ELK(Elastic Stack)

## ElasticSearch

- 데이터들을 검색용으로 가공하고 저장해서 검색기능을 제공하는 도구

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

**install**

- jdbc 설치
- logstash.conf

## Kibana

- 시각화 도구
