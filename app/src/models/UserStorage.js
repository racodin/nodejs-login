"use strict";

class UserStorage {
  static #users = {
    id: ["rome", "apple", "banana"],
    password: ["1234", "1234", "1212"],
    name: ["김선규", "이동률", "유민석"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;
