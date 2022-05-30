const model = require("../database/model.js");
const layout = require("../layout.js");

function get(request, response) {
  const body = /*html*/ `
    <h1>Sign up</h1>
        <form method="POST">
            <label for="username">username: <input type="text" name="username" id="username"></label>
            <label for="password">password: <input type="password" name="password" id="password"></label>
        </form>
    `;
  response.send(layout("signup", body));
}

function post(request, response) {
  const { username, password } = request.body;
  model.getUser(user).then((user) => {
    if (user !== undefined) {
      response.redirect("/");
    }
    // auth.createUser(username, password).then((sid) => {
    //     response.cookie("sid", sid, auth.COOKIE_OPTIONS).redirect("/");
    //   });
  });
}

module.exports = { get, post };
