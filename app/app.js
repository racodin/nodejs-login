"use strict";

// modules
const express = require("express");
const app = express();

// routes
const home = require("./src/routes/home");

// setting
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use("/", home); // middleware

module.exports = app;
