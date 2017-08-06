const db = require("../../util/db");

function initDb() {
  const config = {
    client: "pg",
    connection: process.env.DATABASE_URL
  };
  db.init(config);
}

module.exports = initDb;
