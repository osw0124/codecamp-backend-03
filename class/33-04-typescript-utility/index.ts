interface IProfile {
    name: string;
    age: number;
    school: string;
    hobby?: string;
}

// type Aaa = {
//     name: string;
//     age: number;
//     school: string;
//     hobby?: string;
// };

// // interface, type의 차이

// interface IProfile {
//     apple: number;
// }

// //interface는 선언 병합이 가능하고 type은 불가능하다.
// const bbb: IProfile = {};

// 1. Partial Type
type MyType1 = Partial<IProfile>; // 모든 속성을 필수가 아니게 변경

// 2. Required Type
type MyType2 = Required<IProfile>; // 모든 속성을 필수로 변경

// 3. Pick Type
type MyType3 = Pick<IProfile, "name" | "age">; // 원하는 속성만 선택해서 타입 생성

// 4. Omit Type
type MyType4 = Omit<IProfile, "school">; // 원하는 속성을 빼고 타입 생성

// 5. Record Type
type ZZZ = "aaa" | "qqq" | "rrr";
type MyType5 = Record<ZZZ, string>; // 앞에 타입을 기준으로 타입에 속성의 타입을 지정해서 타입 생성

// union 타입 만들기
const qqq: keyof IProfile; // interface를 union 타입으로 변경

qqq === "age";
