// 1. 함수 이름은 customRegistrationNumber
// 2. 주민번호는 가운데가 '-'로 구성되어야 한다.
// 3. 주민번호는 앞 6자리 뒤 7자리로 구성되어야 한다.
// 4. 함수는 파사드 패턴이 적용 되어야한다.

//바닐라 node에서 export import 하려면 package.js에 type: module을 추가해야한다.
import { splitNumber, checkNumber } from "./resident-registration-number.js";

function customRegistrationNumber(number) {
  const splitNumbers = splitNumber(number);
  checkNumber(number, splitNumbers);
}

const numbers = ["210510-1010101", "210510-1010101010101", "2105101010101"];

for (let number of numbers) {
  customRegistrationNumber(number);
}
