const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Token = require("../models/token");

const bcryptSalt = process.env_SALT_ROUNDS;
const { sendEmail } = require("../utils/email/sendEmail");
const {
  validatePasswordRequestToken,
} = require("../utils/validatePasswordRequestToken");

const requestPasswordReset = async (email) => {
  let errorMsg = "";
  try {
    const user = await User.findOne({ email });
    if (!user) {
      errorMsg = "User does not exist";
      throw new Error();
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `http://localhost:3000/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email, "Password Reset Request", {
      name: user.name,
      link: link,
    });

    return { isSuccessful: true, link };
  } catch (err) {
    return { isSuccessful: false, errorMsg };
  }
};
const resetPassword = async (userId, token, password) => {
  let errorMsg = "";
  try {
    const isValid = await validatePasswordRequestToken(userId, token);
    if (!isValid) {
      errorMsg = "Invalid or expired password reset token";
      throw new Error();
    }
    const hash = await bcrypt.hash(password, Number(bcryptSalt));
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });
    await passwordResetToken.deleteOne();
    return { isSuccessful: true };
  } catch (err) {
    return { isSuccessful: false, errorMsg };
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword,
};
