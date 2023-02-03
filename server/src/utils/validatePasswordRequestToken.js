const Token = require("../models/token");
const bcrypt = require("bcrypt");
async function validatePasswordRequestToken(userId, token) {
  try {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) throw new Error();

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) throw new Error();
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  validatePasswordRequestToken,
};
