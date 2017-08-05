const dotenv = require("dotenv");

dotenv.load();

function getKnex() {
  const config = {
    client: "pg",
    connection: process.env.DATABASE_URL
  };
  return require("knex")(config);
}

module.exports = {
  getKnex
};
