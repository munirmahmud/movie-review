const User = require("../models/userModel");
const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require("../models/passwordResetToken");
const { isValidObjectId } = require("mongoose");
const {
  generateMailTransform,
  generateOTP,
  getErrorMessage,
} = require("../utils/mail");
const { generateRandomByte } = require("../utils/helpers");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({ name, email, password });

  const isUniqueUser = await User.findOne({ email });

  if (isUniqueUser) {
    res.status(401).json({ error: "This email is already in used." });
  }

  await newUser.save();

  let otp = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  const info = await generateMailTransform().sendMail({
    from: "verification@movieflix.com",
    to: newUser.email,
    subject: "Email verification",
    html: `
      <p>Your verfication OTP</p>
      <h1>${otp}</h1>
    `,
  });

  res.status(201).json({
    msg: "Please verify your email. An OTP has been sent to your email",
    status: 201,
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!isValidObjectId(userId)) return res.json({ msg: "Invalid User" });

  const user = await User.findById(userId);
  if (!user) return res.json({ msg: "User not found" });

  if (user.isVerified) return res.json({ msg: "User is already verified" });

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return res.json({ msg: "Token not found" });

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return res.json({ msg: "Please submit a valid OTP" });

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  const info = await generateMailTransform().sendMail({
    from: "verification@movieflix.com",
    to: user.email,
    subject: "Welcome Email",
    html: `<h2>Your email has been verified successfully.</h2>`,
  });

  res.json({ msg: "Your email has been verified." });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.json({ msg: "User not found" });

  if (user.isVerified)
    return res.json({ msg: "This email is already verified." });

  const isTokenExist = await EmailVerificationToken.findOne({ owner: userId });
  if (isTokenExist)
    return res.json({
      msg: "After one hour you can request for another token.",
    });

  let otp = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: otp,
  });

  await newEmailVerificationToken.save();

  const info = await generateMailTransform().sendMail({
    from: "verification@movieflix.com",
    to: user.email,
    subject: "Email verification",
    html: `
      <p>Your verfication OTP</p>
      <h1>${otp}</h1>
    `,
  });

  res.json({ msg: "Another new OTP has been sent to your email" });
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return getErrorMessage(res, "Email is required");
  }

  const userExist = await User.findOne({ email });
  if (!userExist) {
    return getErrorMessage(res, "No user found", 404);
  }

  const isOtpAvailable = await PasswordResetToken.findOne({
    user: userExist._id,
  });
  if (isOtpAvailable) {
    return getErrorMessage(
      res,
      "After one hour you may request for another OTP."
    );
  }

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    user: userExist._id,
    token,
  });
  await newPasswordResetToken.save();

  const tempURL = `http://localhost:3000/reset-password?token=${token}&id=${userExist._id}`;
  // Send confirmation mail with the OTP
  const info = await generateMailTransform().sendMail({
    from: "security@movieflix.com",
    to: userExist.email,
    subject: "Reset Password Link",
    html: `
      <p>Click here to reset password</p>
      <a href="${tempURL}" target="_blank">Reset Password</a>
    `,
  });

  getErrorMessage(res, "A link was sent to your email.");
};
