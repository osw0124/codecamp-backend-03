const user = {
  name: "코드캠프",
  email: "aaa@aaaa.com",
  citizenNumber: "000000-1000000",
  phone: "010-1234-1234",
  favoriteSite: "codecamp.com",
};

function getWelcomeTemplate({ name, email, citizenNumber, phone, favoriteSite }) {
  const template = `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다!!!!</h1>
                  <hr />
                  <div>이메일: ${email}</div>
                  <div>주민번호: ${citizenNumber}살</div>
                  <div>휴대폰 번호: ${phone}</div>
                  <div>내가 좋아하는 사이트: ${favoriteSite}</div>                                  
              </body>
          </html>
      `;
  console.log(template);
}

getWelcomeTemplate(user);

//test
