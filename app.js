const express = require("express");
const connectDB = require("./database");
const { notFound } = require("./middlewares/notFound");
const { errorHandler } = require("./middlewares/errorHandler");
const morgan = require("morgan");
const cors = require("cors");

const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");


const app = express();
require("dotenv").config();


app.use(morgan("dev"));
app.use(cors());
app.use(express.json())
app.use(passport.initialize());
passport.use("local", localStrategy)
passport.use("jwt", jwtStrategy)




app.use(notFound)
app.use(errorHandler)
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`APP IS RUNNING ON PORT: ${process.env.PORT}`);
});
