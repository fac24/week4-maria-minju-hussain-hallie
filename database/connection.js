const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = db;
