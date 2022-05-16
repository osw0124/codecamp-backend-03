import nodemailer from "nodemailer";
import "dotenv/config";

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

async function sendTemplateToEmail(emailReceiver, template) {
  const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT;
  const EMAIL_PW = process.env.EMAIL_PW;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PW,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_ACCOUNT,
    to: emailReceiver,
    subject: "[코드캠프] 가입을 축하합니다!!!",
    html: template,
  });
  console.log(result);
  // console.log(`${email}로 ${template}를 전송합니다!!!!`);
}

export { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail };
