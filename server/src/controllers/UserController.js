const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const saltRounds = 10;
// response { errorMsg: string | null }
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ errorMsg: "Username and Password are required" });
  }

  const user = await User.findOne({ username });

  if (!user) return res.json({ errorMsg: "Username doesn't exist" });

  const {
    password: storedHashPassword,
    _id: userId,
    username: usernameinDb,
  } = user;

  const isMatch = await bcrypt.compare(password, storedHashPassword);

  if (!isMatch) return res.json({ errorMsg: "Incorrect password" });

  const token = generateJWT({ userId });

  return res.json({ errorMsg: null, token, user: { username: usernameinDb } });

  // res.send("Token sent");
  // res.json({ errorMsg: null });

  // return
};

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // await bcrypt.hash("passpass123", saltRounds).then(function (hash) {
  //   const user = new User({
  //     username: "useruser123",
  //     email: "useruser123@gmail.com",
  //     password: hash,
  //   });

  //   user.save();
  //   return res.json({ msg: "yes" });
  //   // Store hash in your password DB.
  // });
};
exports.auth = async (req, res, next) => {
  try {
    const { token: tokenInCookie } = req.cookies;

    if (!tokenInCookie) return res.json({ user: null, authenticated: false });

    const valid = jwt.verify(tokenInCookie, process.env.SECRET_SIGNATURE);

    if (!valid) return res.json({ user: null, authenticated: false });

    const user = await User.findById({ _id: valid.userId });

    const { username } = user;

    // to be fixed
    return res.json({ user: { username }, authenticated: true });
  } catch (err) {
    return res.json({ msg: "something wrong on the server" });
  }
};

function generateJWT(payload) {
  const token = jwt.sign(payload, process.env.SECRET_SIGNATURE);

  return token;
}
