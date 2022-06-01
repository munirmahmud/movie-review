exports.generateOTP = (otp_length = 6) => {
  let otp = "";
  for (let i = 1; i <= otp_length; i++) {
    let randomNum = Math.round(Math.random() * 9);
    otp += randomNum;
  }

  return otp;
};

const nodemailer = require("nodemailer");
exports.generateMailTransform = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.MAIL_TRAP_PORT,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS,
    },
  });
