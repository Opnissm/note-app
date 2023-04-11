const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.auth = async (req, res, next) => {
  try {
    const { token: tokenInCookie } = req.cookies;
    console.log("auth token in cookie", tokenInCookie);
    const valid = jwt.verify(tokenInCookie, process.env.SECRET_SIGNATURE);
    console.log("in auth token", valid);
    if (!valid) throw new Error();
    const user = await User.findOne({
      _id: valid.userId,
      username: valid.username,
      email: valid.email,
    });

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    console.log("error catched", err);
    return res.status(401).json({ errorMsg: "Not authenticated" });
  }
};
