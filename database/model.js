const db = require("./connection");

function getUser(username) {
  const query_text = /*sql*/ `SELECT * FROM users WHERE username=$1`;
  return db.query(query_text, [username]).then((result) => result.rows[0]);
}

function createUser(username, hash) {
  const query_text = /*sql*/ `
  INSERT INTO users (username, password) VALUES ($1,$2)
  RETURNING username, password
  `;
  return db
    .query(query_text, [username, hash])
    .then((result) => result.rows[0]);
}

// Create a new session in the sessions table (on login)
function createSession(sid, user) {
  const INSERT_SESSION = /*sql*/ `
      INSERT INTO sessions (sid, data) VALUES ($1, $2)
      RETURNING sid,data
    `;
  return db.query(INSERT_SESSION, [sid, user]).then((result) => result.rows[0]);
}

// Delete a session on logout
function deleteSession(sid) {
  const DELETE_SESSION = `DELETE FROM sessions WHERE sid=$1`;
  return db.query(DELETE_SESSION, [sid]);
}

// Get posts from database
function getPosts() {
  const SELECT_POSTS = `
    SELECT users.username, posts.id, posts.item_name, posts.item_info, posts.item_image
    FROM users
    INNER JOIN posts
    ON users.id = posts.user_id`;
  return db.query(SELECT_POSTS).then((results) => results.rows);
}

module.exports = { getUser, createUser, createSession, deleteSession, getPosts };
