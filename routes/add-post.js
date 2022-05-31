const model = require("../database/model");

function post(request, response) {
  const item = request.body;
  const file = request.file;
  const image = file.buffer;
  return model.createPost(item, image).then((result) => {
    console.log(result);
    response.redirect("/");
  });
}

module.exports = { post };
