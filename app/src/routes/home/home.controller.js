"use strict";

const User = require("../../models/User");
const logger = require("../../config/logger");

const output = {
  home: (req, res) => {
    logger.info(`GET / 304 "홈 화면으로 이동"`);
    res.render("home/index");
    // res.sendFile(__dirname + "/src/public/index.html");
  },

  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`);
    res.render("home/login");
  },

  register: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },
};

const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: { success: ${response.success}, ${response.err} }`
    );
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response: { success: ${
        response.success
      }${response.msg ? ", msg: " + response.msg : ""} }`
    );
  }
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 201,
    };
    log(response, url);
    return res.status(url.status).json(response);
  },

  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 400 : 201,
    };
    log(response, url);
    return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};
