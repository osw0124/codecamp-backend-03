# ACID

### Atomicity(원자성)

- 모두 성공하거나 모두 실패하거나 => 데이터 오염보다 훨씬 좋다!!

### Consistency(일관성)

- 같은 쿼리의 결과는 동일해야한다

### Isolation(고립성, 격리성)

- 하나의 작업을 처리하는 동안 다른 작업은 기다려야한다
- Isolation-Level => MySQL 디폴트 레벨은 Repeatable-Read
- 레벨이 올라갈수록 안전하지만 성능에 영향을 준다
  | Isolation-Level | Dirty-Read | Non-Repeatable-Read | Phantom-Read |
  | --- | :---: | :---: | :---: |
  | Read-Uncommitted | o | o | o |
  | Read-Committed | x | o | o |
  | Repeatable-Read | x | x | o |
  | Serializable | x | x | x |

  - Dirty-Read
    - commit 되지 않은 데이터를 rollback 전에 조회 가능하다
    - 격리 수준을 올려줘야한다
  - Non-Repeatable-Read
    - 동일한 트랜젝션에서 같은 쿼리의 결과가 다르다
    - 금융, 결제 시스템등 무결성을 지켜줘야하는 경우 반드시 지켜야한다
    - 격리 수준을 올려줘야한다
  - Phantom-Read
    - 다른 사용자의 생성, 수정에 의해서 쿼리 조회 결과가 변경되는 현상
    - Mysql에서 해결해준다
  - Serializable
    - lock을 사용할 수 있다.
      - 낙관적 락
      - 비관적 락
        - 공유 락(S Lock)
          - 읽기 전용 쓰기 잠금
          - pessimistic_read
        - 베타 락(X Lock)
          - 읽기, 쓰기 모두잠금
          - pessimistic_write
    - 예매 시스템 등 동시 요청이 있고 정확한 결과가 팔요한 서비스에 자주 사용한다.
    - 여러 서비스에서 여러 테이블에 락을 걸면 모든 테이블을 사용할 수 없는 상황이 생길 수 있다 -> **Dead-Lock**
      - **여러 서비스에서 락을 걸 때는 같은 순서로 락을 걸어야한다.**

### Durability(지속성)

-성공한 작업은 장애가 발생해도 살아있어야한다.

---

---

# TypeORM

- Query runner

  - TypeORM에서 제공하는 트랜젝션을 하나로 합치는 기능

  ```typescript
  import { Connection } from 'typeorm';
  export class PointTransactionService {
    constructor(private readonly connection: Connection) {}

    async example() {
      const queryRunner = await this.connection.createQueryRunner();
      await queryRunner.connect();

      // transaction 시작!!
      await queryRunner.startTransaction();

      try {
        ////////////////////////////////////
        // 본문 코드
        queryRunner.manager.save(pointTransaction); // 예시
        ///////////////////////////////////

        // commit 성공 확정!!
        await queryRunner.commitTransaction();
      } catch (error) {
        // 에러 발생 시 rollback
        await queryRunner.rollbackTransaction();
      } finally {
        // 연결 해제
        await queryRunner.release();
      }
    }
  }
  ```

---

---

# MySQL 쿼리

- show variables;
  - DB의 설정을 확인할 수있는 mySQL 쿼리
- set global max_connections = 20;
  - 트랜젝션 한계 설정
  - 일반적으로 자주 변경하지는 않는다
  - 하드웨어의 처리 성능에 맞춰서 설정한다
- show status;
  - thread connected를 보면 현재 연결된 트랜젝션 수를 확인할 수 있다.
- show processlist;
  - kill <process 번호>
