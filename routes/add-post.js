const model = require("../database/model.js");
const layout = require("../layout.js");

function post(request, response) {
  const item = request.body;
  const file = request.file;
  const image = file.buffer;
  return model
    .createPost(item, image)
    .then((result) => {
      console.log(result);
      response.redirect("/");
    })
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

function get(request, response) {
  const id = request.params.id;

  return model
    .fetchPost(id)
    .then(() => {
      const bytes = result.row[0].image;
      response.type("image/png").send(bytes).redirect("/");
    })
    .catch((error) => {
      console.error(error);
      response.status(400).send(
        layout(
          `Error`,
          `<h1>Whoops, post not found  😢</h1>
          <a href="/"/>Click here to go back to the homepage</a>`
        )
      );
    });
}

module.exports = { post, get };
