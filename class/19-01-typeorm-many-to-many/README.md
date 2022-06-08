# **_다대다 테이블 관계 데이터 생성, 조회_**

- Many To Many

# **_로그인 프로세스_**

### **1. 세션**

---

1. 클라이언트는 인증을 위해서 서버로 세션 아이디를 전달
2. 클라이언트의 세션 정보는 서버의 메모리에 저장 중 -> 이를 이용해서 인증 진행 -> 서버에 부하 발생 가능
3. 부하를 해결하기 위해 서버를 stateless하게 하기 위해서 DB에 세션정보를 저장
4. DB에도 부하가 걸리면?

   - DB 샤딩, 파티셔닝이 등장
     - 수평 파티셔닝 (샤딩)
       - 하나의 DB 테이블을 나눠서 사용
     - 수직 파티셔닝
   - 일반적인 DB에 저장하면 정보가 디스크에 저장됨 -> 속도가 느림 -> 메모리에 저장하고 싶음 -> 메모리에 정보를 저장하는 DB 사용(Redis 등...)

### **2. 쿠키**

---

1. JWT를 이용한 인증 정보 교환 방식
   - 최초 로그인은 안전한 인증을 진행한 후 접속 권한을 토큰에 담아서 클라이언트에게 전달하고 클라이언트는 필요할 때 마다 토큰을 서버로 전달함
   - JWT는 엑세스 토큰 외에 정보 교환을 위해서 사용하기도 함
   - 토큰에 저장된 데이터는 누구나 볼 수 있음
   - 데이터 수정은 키가 필요함