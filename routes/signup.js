const model = require("../database/model.js");
const layout = require("../layout.js");
const auth = require("../auth.js");

function get(request, response) {
  const body = /*html*/ `
    <h1>Please sign up here</h1>
        <form method="POST">
            <label for="username">Username <input type="text" name="username" id="username"></label>
            <label for="password">Password <input type="password" name="password" id="password"></label>
            <button type="submit">Sign up</button>
        </form>
    `;
  response.send(layout("signup", body));
}

function post(request, response) {
  const { username, password } = request.body;
  model.getUser(username).then((user) => {
    //If database doesn't have username that user typed then will return user as undefined
    if (user === undefined) {
      auth
        .createUser(username, password)
        .then((sid) => {
          response.cookie("sid", sid, auth.COOKIE_OPTIONS).redirect("/");
        })
        .catch(() => {
          response.status(401).send(
            layout(
              `Error`,
              `<h1>Whoops, something went wrong 😢</h1>
            <a href="/"/>Click here to go back to the homepage</a>`
            )
          );
        });
    } else {
      //need some middleware for checking duplicated username for user
      console.log("duplicated username");
      response.redirect("/");
    }
  });
}

module.exports = { get, post };
