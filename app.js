"use strict";

const express = require("express");
const app = express();

// route
const home = require("./routes/home");

// setting
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // middleware

module.exports = app;
