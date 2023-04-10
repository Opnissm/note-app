const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userRouter = require("./routes/user.js");
const noteRouter = require("./routes/note.js");
const cookieParser = require("cookie-parser");
const note = require("./models/note.js");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
const app = express();
const port = 5000;

const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(userRouter);
app.use(noteRouter);

mongoose.set("strictQuery", false);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log("server running");
    });
  })
  .catch((err) => console.log(err));
