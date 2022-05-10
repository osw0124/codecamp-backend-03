function checkNumber(number, splitNumbers) {
  if (number[6] !== "-") {
    console.log("에러발생!!!형식이 올바르지 않습니다!!!");
  } else if (splitNumbers[0].length !== 6 || splitNumbers[1].length !== 7) {
    console.log("에러발생!!!개수를 제대로 입력해 주세요!!!");
  } else {
    changeNumber(splitNumbers);
  }
}

function changeNumber(splitNumbers) {
  const headNumber = splitNumbers[0];
  let tailNumber = splitNumbers[1].slice(0, 1);

  console.log(headNumber + "-" + tailNumber + "******");
}

export { checkNumber, changeNumber };
