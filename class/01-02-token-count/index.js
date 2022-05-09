function getToken(count) {
  if (count === undefined || count === null) {
    console.log("에러발생!!! 갯수를 제대로 입력해 주세요");
    return;
  } else if (count <= 0) {
    console.log("에러발생!!! 갯수가 너무 적습니다");
    return;
  } else if (count > 10) {
    console.log("에러발생!!! 갯수가 너무 많습니다");
    return;
  }

  const token = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
  console.log(token);
}

let count = 5;

getToken(6);
