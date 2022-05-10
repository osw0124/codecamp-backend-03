const apple = 3;
const banana = 2;

console.log(`철수는 사과를 ${apple}개, 바나나를 ${banana}개 가지고 있습니다.`);

//구조 분해 할당!!!
//객채에서 뽑아쓰고 싶은 것만 적은 코드로 쓸 수 있다.
//객체를 할당할 때는 key이름에 따라 할당된다.
//배열을 할달할 때는 순서따라 할당된다.
function getWelcomeTemplate({ name, age, school, createdAt }) {
  // const { name, age, school, createdAt } = user;
  const result = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${createdAt}</div>
            </body>
        </html>
    `;
  console.log(result);
}

const name = "영희";
const age = 12;
const school = "다람쥐 초등학교";
const createdAt = "2020-01-02";

//키와 값이 같으면 생략할 수 있다.
// const myuser = {name: name, age: age, school: school, createdAt: createdAt}
// const myuser = { name, age, school, createdAt };
getWelcomeTemplate({ name, age, school, createdAt });
