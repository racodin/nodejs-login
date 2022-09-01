"use strict";

const users = {
  id: ["rome", "apple", "banana"],
  password: ["1234", "1234", "1212"],
};

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    const id = req.body.id;
    const password = req.body.password;

    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.password[idx] === password) {
        return res.json({
          suceess: true,
        });
      }
    }

    return res.json({
      success: false,
      msg: "로그인에 실패하였슶니다.",
    });
  },
};

module.exports = {
  output,
  process,
};
