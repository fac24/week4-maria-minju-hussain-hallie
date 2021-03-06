const express = require("express");
const server = express();
const signup = require("./routes/signup.js");
const login = require("./routes/login");
const logout = require("./routes/logout");
const home = require("./routes/home.js");
const deletePost = require("./routes/delete.js");
const myitems = require("./routes/myitems.js");
const logger = require("./middleware/logger");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
