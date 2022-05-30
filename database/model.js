const db = require("./connection");

function getUser(username) {
  const query_text = /*sql*/ `SELECT * FROM users WHERE username=$1`;
  return db.query(query_text, [username]).then((result) => result.rows[0]);
}

module.exports = { getUser };
