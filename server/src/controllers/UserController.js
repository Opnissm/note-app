const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const saltRounds = 10;

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  let errorMsg = null;
  try {
    if (!username || !password) {
      errorMsg = "Username and Password are required";
      throw new Error();
    }

    const user = await User.findOne({ username });

    if (!user) {
      errorMsg = "Username doesn't exist";
      throw new Error();
    }

    const {
      password: storedHashPassword,
      email: emailInDb,
      _id: userId,
      username: usernameInDb,
    } = user;

    const isMatch = await bcrypt.compare(password, storedHashPassword);

    if (!isMatch) {
      errorMsg = "Incorrect password";
      throw new Error();
    }

    const token = generateJWT({
      userId,
      username: usernameInDb,
      email: emailInDb,
    });

    return res.json({
      token,
      user: { username: usernameInDb, email: emailInDb, id: userId },
    });
  } catch (err) {
    return res.json({
      errorMsg,
    });
  }
};

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  let usernameErr = null;
  let passwordErr = null;
  let emailErr = null;

  try {
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
      throw new Error();
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
      throw new Error();
    }

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
      token,
      isSuccessful: true,
      user: {
        userId,
        username: newUserUsername,
        email: newUserEmail,
      },
    });
  } catch (err) {
    return res.json({
      formErrors: { usernameErr, passwordErr, emailErr },
      isSuccessful: false,
      user: null,
    });
  }
};
exports.isLoggedIn = async (req, res, next) => {
  try {
    const { token: tokenInCookie } = req.cookies;

    console.log("no");
    // if (!tokenInCookie) return res.json({ user: null, authenticated: false });

    const valid = jwt.verify(tokenInCookie, process.env.SECRET_SIGNATURE);

    console.log(valid);
    if (!valid) return res.json({ user: null, authenticated: false });

    const user = await User.findById({ _id: valid.userId });

    const { username, email, _id: userId } = user;

    res.json({ user: { username, email, userId }, authenticated: true });

    next();
  } catch (err) {
    return res.json({ msg: "something wrong on the server" });
  }
};

function generateJWT(payload) {
  const token = jwt.sign(payload, process.env.SECRET_SIGNATURE);

  return token;
}
