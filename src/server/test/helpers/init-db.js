const dotenv = require("dotenv");
const db = require("../../util/db");

dotenv.load();

function initDb() {
  const config = {
    dbConnectionString: process.env.DATABASE_URL
  };
  db.init(config);
}

module.exports = initDb;
