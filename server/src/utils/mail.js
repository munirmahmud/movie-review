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
    port: 2525,
    auth: {
      user: "522369c640e00b",
      pass: "35d59cb3d582ed",
    },
  });
