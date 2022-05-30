const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model.js");

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

function createUser(username, password) {
  const sid = crypto.randomBytes(18).toString("base64");
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, hash))
    .then((user) => model.createSession(sid, user));
}

function verifyUser(username, password) {
  return model.getUser(username).then((user) => {
    if (!user) {
      return false;
    } else {
      // bcrypt compare will have to happen password
      return user;
    }
  });
}

module.exports = { COOKIE_OPTIONS, verifyUser, createUser };
