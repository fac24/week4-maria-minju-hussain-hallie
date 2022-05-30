const express = require("express");
const server = express();

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");

const login = require("./routes/login.js");

server.use(cookieParser(process.env.COOKIE_SECRET));

server.use(bodyHandler);
server.use(staticHandler);

server.get("/login", login.get);
server.post("/login", login.post);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
