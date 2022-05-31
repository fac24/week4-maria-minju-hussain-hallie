const express = require("express");
const server = express();
const signup = require("./routes/signup.js");
const login = require("./routes/login");
const logout = require("./routes/logout");
const home = require("./routes/home.js");
const addPost = require("./routes/add-post.js");

const logger = require("./middleware/logger");

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/", storage: storage });

server.use(cookieParser(process.env.COOKIE_SECRET));

server.use(bodyHandler);
server.use(staticHandler);
server.use(logger);

server.get("/", home.get);

server.get("/signup", signup.get);
server.post("/signup", signup.post);

server.get("/login", login.get);
server.post("/login", login.post);

server.post("/add-post", upload.single("item_image"), addPost.post);
server.post("/logout", logout.post);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
