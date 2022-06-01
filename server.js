const express = require("express");
const multer = require("multer");

const server = express();
const signup = require("./routes/signup.js");
const login = require("./routes/login");
const logout = require("./routes/logout");
const home = require("./routes/home.js");
const deletePost = require("./routes/delete.js");
const addPost = require("./routes/add-post.js");

const myitems = require("./routes/myitems.js");
const logger = require("./middleware/logger");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");
const db = require("./database/connection.js");

server.use(cookieParser(process.env.COOKIE_SECRET));

server.use(bodyHandler);
server.use(staticHandler);
server.use(logger);

server.get("/", home.get);

server.get("/signup", signup.get);
server.post("/signup", signup.post);

server.get("/login", login.get);
server.post("/login", login.post);

server.get("/myitems", myitems.get);

server.post("/logout", logout.post);

server.post("/delete", deletePost.post);

const upload = multer();
server.post("/add-post", upload.single("item_image"), addPost.post);

//not sure if this will work
server.get("/images/:id", addPost.get);

// server.get("/image/:id", (req, res) => {
//   const id = req.params.id;
//   db.query(
//     "select item_name , item_price , item_info , item_image from posts where id = $1",
//     [id]
//   );
//   const bytes = result.row[0].item_image;
//   res.type("image/png").send(bytes);
// });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
