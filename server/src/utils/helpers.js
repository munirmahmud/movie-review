const crypto = require("crypto");

exports.getErrorMessage = (res, message, code = 409) => {
  return res.status(code).json({ msg: message, status: code });
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) {
        reject(err);
      }

      const bufferString = buff.toString("hex");
      resolve(bufferString);
    });
  });
};
