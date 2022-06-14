const fetchData = async () => {
  console.time("====각각 테스트====");
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공!!");
    }, 2000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공!!!");
    }, 3000);
  });

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("성공!");
    }, 1000);
  });
  console.timeEnd("====각각 테스트====");

  console.log("끝~~~~~~~~~~~~~~~~~~~~~~~!!!");
};

// fetchData();

const fetchData2 = async () => {
  console.time("====한번에 테스트====");
  await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공!!");
      }, 2000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공!!!");
      }, 3000);
    }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("성공!");
      }, 1000);
    }),
  ]);
  console.timeEnd("====한번에 테스트====");

  console.log("끝~~~~~~~~~~~~~~~~~~~~~~~!!!");
};

fetchData2();
