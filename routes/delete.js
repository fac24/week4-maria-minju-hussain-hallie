const model = require("../database/model.js");
const layout = require("../layout.js");

function post(request, response) {
  const post_id = request.body["post-id"];
  return model
    .deletePost(post_id)
    .then(response.redirect("/"))
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

module.exports = { post };
