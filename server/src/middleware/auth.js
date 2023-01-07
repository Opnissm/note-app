const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.auth = async (req, res, next) => {
  try {
    const { token: tokenInCookie } = req.cookies;

    const valid = jwt.verify(tokenInCookie, process.env.SECRET_SIGNATURE);

    if (!valid) throw new Error();

    const user = await User.findById({
      _id: valid.userId,
      username: valid.username,
      email: valid.email,
    });

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    return res.json({ msg: "Not authenticated" });
  }
};
