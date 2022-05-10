function getCurrentDate() {
  currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  const MM = String(currentDate.getMonth() + 1).padStart(2, "0");
  const dd = currentDate.getDate();
  const hh = String(currentDate.getHours()).padStart(2, "0");
  const mm = String(currentDate.getMinutes()).padStart(2, "0");
  const ss = String(currentDate.getSeconds()).padStart(2, "0");

  console.log(`오늘은 ${yyyy}년 ${MM}월 ${dd}일 ${hh}:${mm}:${ss}입니다.`);
}

getCurrentDate();
