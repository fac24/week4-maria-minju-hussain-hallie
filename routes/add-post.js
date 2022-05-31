const multer = require("multer");

function post(request, response) {
  console.log("///", request.body);
}

module.exports = { post };
