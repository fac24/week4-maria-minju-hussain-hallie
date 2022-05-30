const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model.js");


const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};



module.exports = { COOKIE_OPTIONS };