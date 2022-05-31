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

  // if user is not logged in they have a differnent header
  if (loggedIn == undefined) {
    header = `<h1>${title}</h1>
    <header>
    <a href="/signup">sign-up</a>
    <a href="/login">login</a>
    <p>there will be no form for you because not logged in</p>
    </header>`;
    form = ""; //if user is not logged in they don't have access to form!
  } else {
    header = `
  <h1>SeliBay</h1>
  <header>
  <form action="/logout" method="post">
  <button>Logout</button>
  </form>
  <a href="#">my items</a>
  <p>you will see the add form because you are logged in</p>
  </header>
  `;
  }
  let posts = "";
  let userID;

  return model
    .getSessions() // Get the logged in users ID from sessions table
    .then((sessions) => (userID = sessions.data.id)) // Save it to the global variable to use later
    .then(model.getPosts)
    .then((data) => {
      data.forEach((item) => {
        let deleteButton = ""; // post doesn't belong to user the post has no button
        if (item.user_id === userID) {
          // if posts belongs to user, have a button with user_id as its value to POST
          deleteButton = `<form action="/delete" method="POST">
          <button type="submit" aria-label="Delete" name="post-id" value="${item.id}">x</button>
          </form>`;
        }
        return (posts =
          posts +
          //we still need to add the image!
          `
     <div>
     <p>${item.username}</p>
     ${deleteButton}
     <p>${item.item_name}</p>
     <p>${item.item_info}</p>
     </div>`);
      });
      response.send(layout("SeliBay-home", header.concat(form + posts)));
    })
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

module.exports = { get };
