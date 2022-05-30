const layout = require("../layout.js");
const model = require("../database/model.js");

//creaete form
//create database query
//

function get(request, response) {
  const title = "SeliBay-home";
  let html = `
  <h1>SeliBay</h1>
  <header>
  <a href="#">log-out</a>
  <a href="#">my items</a>
</header>
  `;

  let form = `<form action="/post" method="post" enctype="multipart/form-data">
  <label for="product-name"> Product Name </label>
  <input type="text" id="product-name" name="item_name" />

  <label for="product-price"> Product Price </label>
  <input type="number" id="product-price" name ="item_price"/>
  <label for="product-discrption"> Product discrption </label>
  <textarea
    name="item_info"
    id="product-discrption"
    cols="30"
    rows="10"

  ></textarea>

  <label for="uploaded-file"> upload Image </label>
  <input type="file" id="uploaded-file" name="item_image"/>

  <button type="submit">submit</button>
</form>`;

  let loggedIn = request.signedCookies.sid;

  if (!loggedIn) {
    html = `<h1>${title}</h1>
    <header>
    <a href="/signup">sign-up</a>
    <a href="/login">login</a>
  </header>`;
    form = "";
  }

  response.send(layout(title, html.concat(form)));
}

module.exports = { get };
