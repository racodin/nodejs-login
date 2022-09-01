"use strict";

const express = require("express");
const app = express();

// route
const home = require("./src/routes/home");

// setting
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", home); // middleware

module.exports = app;
