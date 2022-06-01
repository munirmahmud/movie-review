const express = require("express");
const {
  validate,
  userValidation,
  validatePassword,
  signInValidation,
} = require("../middlewares/validation");
const { isValidPasswordResetToken } = require("../middlewares/userMiddleware");

const router = express.Router();

const {
  createUser,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signinController,
} = require("../controllers/userController");
// const { userMiddleware } = require("../middlewares/userMiddlewares");

const userMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(201).json({ error: "Email/Password is missing" });
  }

  next();
};

router.post("/create", userValidation, validate, createUser);
router.post("/sign-in", signInValidation, validate, signinController);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-password-reset-token",
  isValidPasswordResetToken,
  validatePassword,
  validate,
  sendResetPasswordTokenStatus
);
router.post("/reset-password", isValidPasswordResetToken, resetPassword);

module.exports = router;
