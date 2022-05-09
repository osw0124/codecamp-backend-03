//하나의 함수는 하나의 기능만

//parameter->param
function getToken(aaa) {
  const token = String(Math.floor(Math.random() * 10 ** aaa)).padStart(aaa, "0");
  console.log(token);
}

function add(aaa, bbb) {
  const result = aaa + bbb;
  return result;
}

function minus(aaa, bbb) {
  const result = aaa - bbb;
  return result;
}

//argument->args
getToken(6);

//return
const aaa = add(1, 2);
const bbb = minus(12, 10);

const zzz = aaa * bbb;
console.log(zzz);
