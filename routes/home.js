const layout = require("../layout.js");
const model = require("../database/model.js");

function get(request, response) {
  const title = "SeliBay-home";
  let header = "";

  let form = `
  <form action="/post" method="post" enctype="multipart/form-data">
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
  // if user is not logged in.
  if (loggedIn == undefined) {
    header = `<h1>${title}</h1>
    <header>
    <a href="/signup">sign-up</a>
    <a href="/login">login</a>
    <p>there will be no form for you because not logged in</p>
    </header>`;
    form = "";
  } else {
    header = `
  <h1>SeliBay</h1>
  <header>
  <a href="#">log-out</a>
  <a href="#">my items</a>
  <p>you will see the add form because you are logged in</p>
  </header>
  `;
  }
  let posts = "";

  return model.getPosts().then((data) => {
    data.forEach((item) => {
      console.log(item);
      return (posts =
        posts +
        //we still need to add the image!
        `
     <div>
     <p>${item.username}</p>
     <p>${item.item_name}</p>
     <p>${item.item_info}</p>
     </div>`);
    });
    response.send(layout("SeliBay-home", header.concat(form + posts)));
  });
}

module.exports = { get };
