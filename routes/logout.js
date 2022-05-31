const { deleteSession } = require("../database/model.js");

function post(request, response, next) {
  const sid = req.signedCookies.sid;
  deleteSession(sid)
    .then(() => {
      response.clearCookie("sid");
      response.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
}

module.exports = { post };
