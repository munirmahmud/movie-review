const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { getErrorMessage } = require("../utils/helpers");

exports.isValidPasswordResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || isValidObjectId(userId)) {
    return getErrorMessage(res, "Invalid request", 401);
  }

  const resetToken = await PasswordResetToken.findOne({ user: userId });
  if (!resetToken) {
    return getErrorMessage(res, "Unautorized access, invalid request!", 401);
  }

  const isMatched = await resetToken.compareToken(token);
  if (!isMatched) {
    return getErrorMessage(res, "Unautorized access, invalid request!", 401);
  }

  req.resetToken = resetToken;
  next();
};
