const express = require("express");
const server = express();
const signup = require('./routes/signup.js');
const home = require('./routes/home.js')
const logger = require('./middleware/logger')


const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");
const cookieParser = require("cookie-parser");

server.use(cookieParser());

server.use(bodyHandler);
server.use(staticHandler);
server.use(logger)

server.get('/signup', signup.get)
server.post('/signup',signup.post)

server.get('/',home.get)

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
