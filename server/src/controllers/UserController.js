const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const saltRounds = 10;

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ errorMsg: "Username and Password are required" });
  }

  const user = await User.findOne({ username });

  if (!user) return res.json({ errorMsg: "Username doesn't exist" });

  const {
    password: storedHashPassword,
    email: emailInDb,
    _id: userId,
    username: usernameInDb,
  } = user;

  const isMatch = await bcrypt.compare(password, storedHashPassword);

  if (!isMatch) return res.json({ errorMsg: "Incorrect password" });

  const token = generateJWT({
    userId,
    username: usernameInDb,
    email: emailInDb,
  });

  return res.json({
    errorMsg: null,
    token,
    user: { username: usernameInDb, email: emailInDb, id: userId },
  });
};

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let usernameErr = null;
  let passwordErr = null;
  let emailErr = null;

  if (!username) {
    usernameErr = "Username is required";
  }

  if (!email) {
    emailErr = "Email is required";
  }

  if (!password) {
    passwordErr = "Password is required";
  } else if (password.length <= 7) {
    passwordErr = "Password should be at least 8 characters long";
  }

  // check if any of the error variable has value
  if (usernameErr || emailErr || passwordErr) {
    return res.json({
      formErrors: { usernameErr, passwordErr, emailErr },
      isSuccessful: false,
    });
  }

  const usernameExist = await User.findOne({ username });

  if (usernameExist) {
    usernameErr = "Username is already taken";
  }

  const emailExist = await User.findOne({ email });

  if (emailExist) {
    emailErr = "Email is already taken";
  }

  // check if error variable has value
  if (usernameErr || emailErr) {
    return res.json({
      formErrors: { usernameErr, passwordErr, emailErr },
      isSuccessful: false,
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, email, password: hashPassword });

    newUser.save();

    const {
      username: newUserUsername,
      email: newUserEmail,
      _id: userId,
    } = newUser;

    const token = generateJWT({
      userId,
      email: newUserEmail,
      username: newUserUsername,
    });

    return res.json({
      formErrors: { usernameErr, passwordErr, emailErr },
      token,
      isSuccessful: true,
      user: {
        userId,
        username: newUserUsername,
        email: newUserEmail,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
exports.auth = async (req, res, next) => {
  try {
    const { token: tokenInCookie } = req.cookies;

    if (!tokenInCookie) return res.json({ user: null, authenticated: false });

    const valid = jwt.verify(tokenInCookie, process.env.SECRET_SIGNATURE);

    if (!valid) return res.json({ user: null, authenticated: false });

    const user = await User.findById({ _id: valid.userId });

    const { username, email, _id: userId } = user;

    return res.json({ user: { username, email, userId }, authenticated: true });
  } catch (err) {
    return res.json({ msg: "something wrong on the server" });
  }
};

function generateJWT(payload) {
  const token = jwt.sign(payload, process.env.SECRET_SIGNATURE);

  return token;
}
