const auth = require("../auth.js");
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
      </form>`
  );
  response.send(html);
}

function post(request, response) {
  // get username and email from user inputs
  const { username, password } = request.body;
  // verifyuser in exists in the DB
  auth
    .verifyUser(username, password)
    .then((user) => {
      if (!user) {
        // return the sid to the next then
        const html = layout(
          "Login to selibay",
          /* html */ `   
          <h2>Please log in to access all areas</h2>
          <form method="POST">
          <label for="username">Username</label>
          <input type="text" id="username" name="username">
          <label for="password">Password</label>
          <input type="password" id="password" name="password">
          <button>Log in</button>
          <p>Username or password incorrect or not found. Please log in again or sign up.</p>
          </form>
          `
        );
        response.send(html);
      } else {
        // if user exists create new session in database
        return auth.createSession(user);
      }
    })
    // Add user to session in the browser cookies
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/");
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
}

module.exports = { get, post };
