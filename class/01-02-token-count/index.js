console.log("안녕하세요~~");

function getToken(count) {
  if (count == undefined) {
    console.log("에러발생!!! 갯수를 입력해주세요.");
  } else if (count <= 0) {
    console.log("에러발생!!! 갯수가 너무 적습니다.");
  } else if (count >= 10) {
    console.log("에러발생!! 갯수가 너무 많습니다.");
  } else {
    const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
    console.log(result);

    return result;
  }
}

let count = 8;

getToken(count);
