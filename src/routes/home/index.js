"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./home.controller");

router.get("/", controller.index);

router.get("/login", controller.login);

module.exports = router;
