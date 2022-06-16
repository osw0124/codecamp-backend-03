# Redis

- 메모리 기반 DB
- key:value 데이터 베이스
- 빠른 검색용(Cache-Aside) 또는 임시 저장용(Write-Back)으로 사용한다.

**install** - local

```
yarn add redis
yarn add cache-manager-redis-store
yarn add cache-manager
yarn add --dev @types/cache-manager-redis-store -> typescript를 사용하는 경우만
```

**Cache-Aside**

- Redis에 원하는 결과가 있으면 바로 검색해서 전달하고 없으면 디스크 DB에서 찾아 전달한다.
- DB에서 찾아 전달하고 나면 결과를 Redis에 저장한다.

**실행 중인 redis 접속**

```
redis-cli
```

**간단한 값 입력과 조회**

```
> keys *
(empty array)
> set aaa 123
OK
> keys *
1) "aaa"
> get aaa
"123"
```

**유효시간(ttl) 조회**

```
>ttl aaa
(integer) -1 // 영구 저장 중 (물론 메모리임)
```

**유효시간 변경**

```
> expire aaa 120
(integer) 1
> ttl aaa
(integer) 118
> ttl aaa
(integer) 117
>
```
