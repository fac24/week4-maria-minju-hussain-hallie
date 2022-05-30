const express = require("express");
const res = require("express/lib/response");
const server = express();

server.get("/", (req, res) => {
  res.send("<h1>WALLA</h1>");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
