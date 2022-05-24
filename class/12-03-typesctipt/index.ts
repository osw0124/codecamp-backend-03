//타입추론
let aaa = "안녕하세요"; //선언할 때 입력한 값의 데이터 타입을 보고 지정할 데이터 타입을 추론함
aaa = 3;

//타입 명시
let bbb: string = "반갑습니다";
bbb = 10;

//타입 명시가 필요한 상황
let ccc: string | number = "반값습니다.";
ccc = 10;

//숫자타입
let ddd: number = 10;
ddd = "철수";

//불린타입
let eee: boolean = true;
eee = false;
eee = "false"; // true로 작동함

//배열타입
let fff: number[] = [1, 2, 3, 4, 5];
let ggg: string[] = ["철수", "영희", "훈이"];
let hhh: (string | number)[] = [1, 2, 3, 4, "철수"];

//객체타입
interface IProfile {
  name: string;
  age: number | string;
  school: string;
  hobby?: string; //있어도 되고 없어도 됨
}
let profile: IProfile = {
  name: "철수",
  age: 8,
  school: "다람쥐 초등학교",
};
profile.age = "8살";
profile.hobby = "수영";

//함수타입
const add = (money1: number, money2: number, unit: string): string /** 리턴 타입*/ => {
  return money1 + money2 + unit;
};
const result = add(1000, 2000, "원"); //any 타입
