const layout = require("../layout.js");

//creaete form
//create database query
//

function get(request, response) {
  const title = "SeliBay-HOME";
  let form = `
  <h1>${title}</h1>
  <form action="/post" method="post" enctype="multipart/form-data">
  <label for="product-name"> Product Name </label>
  <input type="text" id="product-name" />

  <label for="product-price"> Product Price </label>
  <input type="number" id="product-price" />

  <label for="product-price"> Product Price </label>
  <input type="number" id="product-price" />

  <label for="product-discrption"> Product discrption </label>
  <textarea
    name="product-discrption"
    id="product-discrption"
    cols="30"
    rows="10"
  ></textarea>

  <label for="uploaded-file"> upload Image </label>
  <input type="file" id="uploaded-file" name="uploaded_file"/>

  <button type="submit">submit</button>
</form>`;

  let loggedIn = false;

  if (!loggedIn) {
    form = `<h1>${title}</h1>`;
  }

  response.send(layout(title, form));
}

module.exports = { get };
