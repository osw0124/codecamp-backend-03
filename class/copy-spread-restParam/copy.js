const child1 = {
  name: "철수",
  age: "13",
  school: "다람쥐초등학교",
};

const child2 = { ...child1 };

child2.name = "영희";

const child3 = {
  name: { first: "김", last: "철수" },
  age: 13,
  school: "다람쥐 초등학교",
};

//파싱을 이용한 깊은 복사
const child4 = JSON.parse(JSON.stringify(child3));

child4.name.first = "최";
child4.name.last = "영희";

/////객체 내부의 key 값도 변경이 불가능하게 Object.freeze 사용
const child10 = Object.freeze({
  name: { first: "김", last: "철수" },
  age: 13,
  school: "다람쥐 초등학교",
});

//스프레드 연산자를 이용한 배열 합치기
const aaa = [1, 2, 3, 4, 5];
const bbb = [6, 7, 8, 9];
const ccc = [...aaa, ...bbb];
// ccc(9)[(1, 2, 3, 4, 5, 6, 7, 8, 9)];

//rest파라미터를 이용한 일부 복사
const person = {
  name: "철수",
  age: 8,
  school: "다람쥐 초등학교",
  money: 2000,
  hobby: "수영",
};
//person 객페에서 money, hobby를 제외하고 복사한다.
const { money, hobby, ...rest } = person;

// lodash 검색
