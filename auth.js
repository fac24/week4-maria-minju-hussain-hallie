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
    if (user) {
      // bcrypt compare will have to happen password
      return bcrypt.compare(password, user.password).then((result) => {
        if (result) return user;
      });
    } else {
      console.error("User cannot be verified (no such user)");
      return false;
    }
  });
}

function createSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.createSession(sid, user).then((result) => {
    return result.sid;
  });
}

module.exports = { COOKIE_OPTIONS, verifyUser, createUser, createSession };
