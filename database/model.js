const db = require("./connection.js");

// Get the user info from the database on login
function getUser(username) {
  const SELECT_USER = `
    SELECT id, username, password FROM users WHERE username=$1
  `;
  return db.query(SELECT_USER, [username]).then((result) => result.rows[0]);
}

// Create a new session in the sessions table (on login)
function createSession(sid, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

module.exports = {
  getUser,
  createSession,
};
