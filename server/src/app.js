const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// const mongoConnect = require("./db/mongodb");
const userRouter = require("./routes/user.js");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);

// function main() {
//   const token = jwt.sign({ _id: "abc123" }, "helloworld");

//   const data = jwt.verify(token, "helloworld");

//   console.log(data);
//   console.log(token);
//   mongoConnect(() => {
//     app.listen(port, () => {
//       console.log("server running");
//     });
//   });
// }
// main();
mongoose.set("strictQuery", false);

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then((result) =>
    app.listen(port, () => {
      console.log("server running");
    })
  )
  .catch((err) => console.log(err));
