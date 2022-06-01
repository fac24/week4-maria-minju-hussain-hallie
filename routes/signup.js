const model = require("../database/model.js");
const layout = require("../layout.js");
const auth = require("../auth.js");

function get(request, response) {
  header = `
    <header class="flex">
    <h1><span class="red">se</span><span class="blue">li</span><span class="yellow">B</span><span class="green">ay</span></h1>
    <div>
    <a href="/signup" class="button signup">Sign up</a>
    </div>
    </header>
  `;

  const body = /*html*/ `
    <h2>Please sign up here</h1>
        <form method="POST" action ="/signup">
       
        <label for="username"> Username <span style="color:#ff0000" aria-hidden="true">*</span></label>
        <input type="text" name="username" id="username" required/><br>

        <label for="password"> Password <span style="color:#ff0000" aria-hidden="true">*</span></label>
        <div id="passwordRequirements" class="requirements">Password should be at least 6 characters long</div>
        <input type="password"
               id="password"
              required/><br><br>

        <button type="submit" class="button login" aria-label="click button to submit">Submit</button>
        
        </form>
    `;
  response.send(layout("signup", header.concat(body)));
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
