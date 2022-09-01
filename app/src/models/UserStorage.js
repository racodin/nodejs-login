"use strict";

const fs = require("fs").promises;

class UserStorage {
  // static #users = {
  //   id: ["rome", "apple", "banana"],
  //   password: ["1234", "1234", "1212"],
  //   name: ["김선규", "이동률", "유민석"],
  // };

  static #getUsers(data, fields) {
    const users = JSON.parse(data);
    console.log(fields);
    if (!fields.length) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users);
    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    return userInfo;
  }

  static getUsers(...fields) {
    return fs
      .readFile("./src/db/users.json")
      .then((data) => {
        return this.#getUsers(data, fields);
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    return fs
      .readFile("./src/db/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers();
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    fs.writeFile("./src/db/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
