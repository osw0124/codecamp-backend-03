# DB Trigger(GCP BigQuery)

- DB에서 특정 활동이 감지 되었을 때 스크립트 또는 코드를 통해서 원하는 기능을 실행하는 것
- DB안에서 프로시저를 이용할 수도 있고 서버에서 코드를 이용할 수도 있다
- 이번에는 TypeORM을 이용해서 코드(GCP BigQuery)로 트리거를 작성해서 사용하는 방법을 연습한다

**트리거 기본설정**

```typescript
import { Connection, EntitySubscriberInterface, EventSubscriber } from 'typeorm';

import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  // Product Entity가 트리거 대상
  constructor(connection: Connection) {
    connection.subscribers.push(this); //this는 ProductSubscriber
  }
  listenTo() {
    return Product;
  }

  //트리거 예시, event에는 Entity 정보 등이 들어있다
  afterInsert(event: InsertEvent<Product>): void | Promise<any> {}

  beforeInsert(event: InsertEvent<Product>): void | Promise<any> {}

  afterUpdate(event: UpdateEvent<Product>): void | Promise<any> {}
}
```

**_주의_**

- 핵심 비즈니스 로직의 기능을 트리거로 작성해서는 안된다. -> 중요 테이블의 기반 데이터(값)이 변경되는 기능
- 유지 보수 중에 문제가 생길 수 있다.
- 트리거는 기반 데이터로 통계를 작성하거나 로그를 남기는 등 파생 결과를 남기기 위해 사용하는 것이 좋다.

# Big query

**install**

```
yarn add @google-cloud/bigquery
```

**코드 예시 - 빅쿼리를 트리거로 사용할 때**

```typescript
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { BigQuery } from '@google-cloud/bigquery';
import dotenv/config

import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  // Product Entity가 트리거 대상
  constructor(connection: Connection) {
    connection.subscribers.push(this); //this는 ProductSubscriber
  }
  listenTo() {
    // 연결 대기
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event);

    // 키파일과 ID는 GCP에서 확인한다
    const bigQuery = new BigQuery({
      keyFilename: '',
      projectId: '',
    });

    //Big Query에 대이터를 Insert
    bigQuery //데이터 셋과 테이블 이름은 GCP에서 생성한 이름과 같아야한다.
      .dataset(process.env.GCP_BIGQUERY_DATASET)
      .table(process.env.GCP_BIGQUERY_TABLE)
      .insert([
        {
          // 속성은 entity, GCP 테이블 스키마와 같아야한다.
          id: event.entity.id,
          name: event.entity.name,
        },
      ]);
  }
}
```

# 프로시저

- DB에서 함수를 작성해서 사용할 수 있게하는 기능

```sql
use myproject03;

#프로시저 리스트 확인
show procedure status;

# 프로시저 삭제
drop procedure mydummydata;

#프로시저 생성
create procedure mydummydata()
begin # 프로시저 시작
	declare i int default 1;

	while i <= 5000000 do
		INSERT into board(writer, title, contents) values('cheolsu', rand(), 'isContents');
		set i = i + 1;
	end while;
end; # 프로시저 끝

#프로시저 실행
call mydummydata();
```

# 인덱스(Mysql)

**옵티마이저**

- 검색을 효율적으로 해주는 DB 내장기능

**실행계획**

- 효율적인 검색을 위한 계획

**Explain 명령어**

- 옵티마이저가 결정한 실행계획을 보여주는 명령어
- 실행계획에서 type을 확인하면 실행계획을 알 수 있다.
  - 다양한 타입이 있다. (아래는 일부 예시)
    - ALL
    - const
    - ref
    - range
- rows를 확인하면 예상 검색 회 수를 알 수 있다.

---

- 검색 쿼리 반응 속도를 올리기 위해서 사용하는 기능
- PK, FK, UNIQUE는 자동으로 인덱스가 생성된다.
- 보통 인덱스가 걸려있는 속성으로 검색하면 검색 속도가 더 빠르다

  ```sql
  #테이블에 걸려있는 인덱스 확인
  show index from board<테이블>

  #인덱스 생성
  create index idx_title on board(title) <테이블(속성)>
  ```

**_주의_**

- 인덱스를 설정하면 저장, 업데이트 속도에 영향을 미친다.
- 값이 자주 변하지 않고 많이 있는 곳 검색만 자주 이뤄지는 곳에 인덱스를 설정하는 것이 좋다.
- 인덱스를 생성하면 인덱스 속성을 기준으로 재정렬한다.

# Redis

- 메모리 기반 DB
- 빠른 검색용(Cache-Aside) 또는 임시 저장용(Write-Back)으로 사용한다.

Cache-Aside

- Redis에 원하는 결과가 있으면 바로 검색해서 전달하고 없으면 디스크 DB에서 찾아 전달한다.
- DB에서 찾아 전달하고 나면 결과를 Redis에 저장한다.
