const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordResetTokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});
passwordResetTokenSchema.pre("save", async function (next) {
  if (this.isModified("otp")) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  next();
});
passwordResetTokenSchema.methods.compareToken = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};

module.exports = mongoose.model("PasswordResetToken", passwordResetTokenSchema);
