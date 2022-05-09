console.log("안녕하세요~~~");

function getToken(aaa) {
  const token = String(Math.floor(Math.random() * 10 ** aaa)).padStart(aaa, "0");
  console.log(token);
}

getToken(13);
