const layout = require("../layout.js");
const model = require("../database/model.js");

function get(request, response) {
  const title = "seliBay";
  let header = "";
  let form = `
  <form action="/add-post" method="post" enctype="multipart/form-data" class="form">
  <label for="product-name"> Product Name </label>
  <input type="text" id="product-name" name="item_name" />
  <label for="product-price"> Product Price </label>
  <input type="number" id="product-price" name ="item_price"/>
  <label for="product-discription"> Product discription </label>
  <textarea
  name="item_info"
  id="product-discription"
  cols="30"
  rows="10"
  ></textarea>
  <label for="uploaded-file"> upload Image </label>
  <input type="file" id="uploaded-file" name="item_image"/>
  <button type="submit" class="button login">submit</button>
  </form>`;

  let loggedIn = request.signedCookies.sid;

  // if user is not logged in they have a differnent header
  if (!loggedIn) {
    header = `
    <div class="flex">
  <h1><span class="red">se</span><span class="blue">li</span><span class="yellow">B</span><span class="green">ay</span></h1>
    <header>
    <div>
    <a href="/signup" class="button signup">sign-up</a>
    <a href="/login" class="button login">login</a>
    </div>
    </div>
    </header>`;
    form = ""; //if user is not logged in they don't have access to form!
  } else {
    header = `
    <header class="flex">
    <h1><span class="red">se</span><span class="blue">li</span><span class="yellow">B</span><span class="green">ay</span></h1>
    <div>
    <form action="/logout" method="post">
    <button class="button logout">Logout</button>
    </form>
    <a href="/myitems" class="button login">My items</a>
    </div>
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
     <div class="post-container">
     <p>${item.username}</p>
     ${deleteButton}
     <p>${item.item_name}</p>
     <p>${item.item_info}</p>
     </div>`);
      });
      response.send(layout("SeliBay-home", header.concat(form + posts)));
    })
    .catch((error) => {
      console.error(error);
      response
        .status(401)
        .send(
          layout(
            `Error`,
            header.concat(`<h1>Whoops, something went wrong 😢</h1>`)
          )
        );
    });
}

module.exports = { get };
