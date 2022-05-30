const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model.js");

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

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

function createSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.createSession(sid, { user }).then((sid) => sid);
}

module.exports = { COOKIE_OPTIONS, verifyUser, createSession };
