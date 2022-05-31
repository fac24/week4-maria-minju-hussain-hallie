const model = require("../database/model.js");
const layout = require("../layout.js");

function get(request, response) {
  let loggedIn = request.signedCookies.sid;

  if (loggedIn === undefined) {
    response.send(
      layout("My items", `<a href="/login">Please login to view this page</a>`)
    );
  } else {
    const header = `  <h1>SeliBay - my items</h1>
      <header>
      <form action="/logout" method="post">
      <button>Logout</button>
      </form>
      <a href="/">Home Page</a>
      </header>`;

    const posts = "";

    return (
      model
        .getSessions() // Get the logged in users ID from sessions table
        .then((sessions) => sessions.data.id)
        .then((id) => model.userPosts(id))
        .then((data) => console.log(data))
        // HERE WE WILL USE THE SAME LOGIC IN HOME TO DISPLAY DATA
        .then(response.send(layout("My items", header.concat(posts))))
        .catch(() => {
          response.status(401).send(
            layout(
              `Error`,
              `<h1>Whoops, something went wrong 😢</h1>
            <a href="/"/>Click here to go back to the homepage</a>`
            )
          );
        })
    );
  }
}

module.exports = { get };
