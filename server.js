const express = require("express");
const server = express();

const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");

const home = require("./routes/home.js");

server.get("/", home.get);

server.use(cookieParser());

server.use(bodyHandler);
server.use(staticHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
