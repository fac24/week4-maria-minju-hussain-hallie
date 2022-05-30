//const auth = require("../auth.js");
const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    "Login to selibay",
    `
      <h2>Please log in to access all areas</h2>
      <form method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
    </form>
    `
  );
  response.send(html);
}

module.exports = { get };
