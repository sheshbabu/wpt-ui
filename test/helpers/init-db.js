const db = require("../../util/db");

function initDb() {
  const config = {
    dbConnectionString: process.env.DATABASE_URL
  };
  db.init(config);
}

module.exports = initDb;
