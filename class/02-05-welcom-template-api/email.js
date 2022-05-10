import { getToday } from "./utils.js";

function checkValidationEmail(email) {
  if (email === null || email === undefined || !email.includes("@")) {
    console.log("입력한 이메일을 다시 확인해 주세요!!");
    return false;
  } else {
    return true;
  }
}

function getWelcomeTemplate({ name, age, school, email }) {
  const template = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>이메일: ${email}</div>                
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
  return template;
}

function sendTemplateToEmail(email, template) {
  console.log(`${email}로 ${template}를 전송합니다!!!!`);
}

export { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail };
