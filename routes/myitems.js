const model = require("../database/model.js");
const layout = require("../layout.js");

function get(request, response) {
  const header = `  <h1>SeliBay - my items</h1>
  <header>
  <form action="/logout" method="post">
  <button>Logout</button>
  </form>
  <a href="/">Home Page</a>
  </header>`;
  response.send(layout("My items", header));
}

module.exports = { get };
