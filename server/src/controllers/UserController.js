const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Note = require("../models/note.js");
const User = require("../models/user.js");
const {
  requestPasswordReset,
  resetPassword,
} = require("../services/forgot-password-auth");
const { generateJWT } = require("../utils/generateJWT");
const {
  validatePasswordRequestToken,
} = require("../utils/validatePasswordRequestToken");
exports.logout = async (req, res, next) => {
  res.clearCookie("token", { secure: true, httpOnly: true });
  return res.json({ isSuccessful: true });
};
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
    res.cookie("token", token, { secure: true, httpOnly: true });
    return res.json({
      token,
      user: { username: usernameInDb, email: emailInDb, userId },
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

    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const newUser = new User({ username, email, password: hashPassword });

    await newUser.save();

    const {
      username: newUserUsername,
      email: newUserEmail,
      _id: userId,
    } = newUser;

    const firstNoteByDefault = new Note({
      creator: userId,
      content: "",
      title: "Untitled",
    });

    firstNoteByDefault.save();

    const token = generateJWT({
      userId,
      email: newUserEmail,
      username: newUserUsername,
    });
    res.cookie("token", token, { secure: true, httpOnly: true });
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

exports.resetPasswordRequestController = async (req, res, next) => {
  const { email } = req.body;
  const requestPasswordService = await requestPasswordReset(email);
  return res.json(requestPasswordService);
};

exports.validatePasswordResetTokenController = async (req, res, next) => {
  try {
    const isValid = await validatePasswordRequestToken(
      req.body.userId,
      req.body.token
    );
    return res.json({ isValid });
  } catch (err) {}
};
exports.resetPasswordController = async (req, res, next) => {
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  return res.json(resetPasswordService);
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("is logged in auth header and token", token);
    const valid = jwt.verify(token, process.env.SECRET_SIGNATURE);
    console.log("verify", valid);
    if (!valid) throw new Error();

    const user = await User.findById(valid.userId);

    const { username, email, _id: userId } = user;
    return res.json({ user: { username, email, userId }, authenticated: true });
  } catch (err) {
    return res.json({
      errorMsg: "There's an error when processing the request",
    });
  }
};
