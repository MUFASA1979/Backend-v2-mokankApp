const express = require("express");
const connectDB = require("./database");


const app = express();
require("dotenv").config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`APP IS RUNNING ON PORT: ${process.env.PORT}`);
});
