const model = require("../database/model.js");
const layout = require("../layout.js");

function get(request, response) {
  let loggedIn = request.signedCookies.sid;

  if (!loggedIn) {
    response.send(
      layout("My items", `<a href="/login">Please login to view this page</a>`)
    );
  } else {
    const header = `
  <div class="flex">
  <h1><span class="red">se</span><span class="blue">li</span><span class="yellow">B</span><span class="green">ay</span></h1>
  <div>
      <form action="/logout" method="post">
      <button class="button logout">Logout</button>
      </form>
      <a href="/" class="button login">Home Page</a>
  </div>
 </div>`;

    const posts = "";

    return model
      .getSessions() // Get the logged in users ID from sessions table
      .then((sessions) => sessions.data.id)
      .then((id) => model.userPosts(id))
      .then((data) => {
        data.forEach((item) => {
          return (posts =
            posts +
            //we still need to add the image!
            `<div>
    <form action="/delete" method="POST">
          <button type="submit" aria-label="Delete" name="post-id" value="${item.id}">x</button>
     </form>
     <p>${item.username}</p>
     ${deleteButton}
     <p>${item.item_name}</p>
     <p>${item.item_info}</p>
     </div>`);
        });
      })
      .then(response.send(layout("My items", header.concat(posts))))
      .catch((error) => {
        console.error(error);
        response.status(401).send(
          layout(
            `Error`,
            `<h1>Whoops, something went wrong 😢</h1>
            <a href="/"/>Click here to go back to the homepage</a>`
          )
        );
      });
  }
}

module.exports = { get };
