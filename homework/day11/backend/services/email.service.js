import nodemailer from "nodemailer";
import "dotenv/config";

import { UtilService } from "../services/utils.service.js";

export class EmailService {
  checkValidationEmail = (email) => {
    if (email === null || email === undefined || !email.includes("@")) {
      // console.log("입력한 이메일을 다시 확인해 주세요!!");
      return false;
    } else {
      return true;
    }
  };

  getWelcomeTemplate = ({ name, email }) => {
    const utilService = new UtilService();
    const template = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!!</h1>
                <hr />
                <div>이름: ${name}</div>                
                <div>이메일: ${email}</div>                
                <div>가입일: ${utilService.getToday()}</div>
            </body>
        </html>
    `;
    return template;
  };

  sendTemplateToEmail = async (emailReceiver, template) => {
    const EMAIL_ACCOUNT = process.env.EMAIL_SENDER;
    const EMAIL_PW = process.env.EMAIL_PASS;

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
  };
}
