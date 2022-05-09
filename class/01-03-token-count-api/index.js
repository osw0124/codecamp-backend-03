function createTokenOfPhone(phoneNum) {
  //1.핸드폰 번호가 10~11자리인지 확인
  if (phoneNum.length !== 10 && phoneNum.length !== 11) {
    console.log("에러발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return;
  }

  //2.토큰 생성(getToken)
  const count = 5;

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

  //3.토큰을 핸드폰번호로 전송
  console.log(phoneNum + "번호로 인증번호" + token + "를 전송합니다!!!");
}

createTokenOfPhone("01012345678");
