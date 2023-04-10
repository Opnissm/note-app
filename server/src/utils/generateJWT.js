const jwt = require("jsonwebtoken");
module.exports = {
  generateJWT(payload) {
    const token = jwt.sign(payload, process.env.SECRET_SIGNATURE);
    return token;
  },
};
