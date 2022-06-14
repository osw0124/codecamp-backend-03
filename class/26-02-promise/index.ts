// console.log("hi");

// const result = await new Promise((resolve, reject) => resolve("철수!!"));

const fetchData = () => {
  console.log("1번!!!!!!!!");
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve("성공시 받는 데이터");
      } catch (error) {
        reject("실패했습니다!!");
      }
    }, 2000);
  }).then((res) => {
    console.log("2번!!!!!!!!!!!!!!");
  });
  console.log("3번!!!!!!!!!!!11");
};

fetchData();
