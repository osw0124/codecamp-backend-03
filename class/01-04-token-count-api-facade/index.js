function checkValidationPhone(phone) {
  if (phone.length !== 10 && phone.length !== 11) {
    console.log("휴대폰 번호의 자릿수가 맞지 않습니다.");
    return false;
  }
  return true;
}

function createToeknOfPhone(phone, count) {
  const isValidationPhone = checkValidationPhone(phone);

  if (count == undefined) {
    console.log("에러발생!!! 갯수를 입력해주세요.");
  } else if (count <= 0) {
    console.log("에러발생!!! 갯수가 너무 적습니다.");
  } else if (count >= 10) {
    console.log("에러발생!! 갯수가 너무 많습니다.");
  } else {
    const token = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
    //핸드폰 번호에 토큰을 전송하는 API
    console.log(`${phone}번호로 인증번호 ${token}을 전송합니다.`);
  }
}

createToeknOfPhone("01012345678", 6);
