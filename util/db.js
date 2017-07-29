const knex = require("knex");
let pg = null;

function init(config) {
  initKnex(config);
  migrateKnex(config);
}

function initKnex(config) {
  const knexConfig = getKnexConfig(config);
  pg = knex(knexConfig);
}

function migrateKnex(config) {
  const knexConfig = getKnexConfig(config);
  knex.migrate.latest(knexConfig);
}

function getKnexConfig(config) {
  return {
    client: "pg",
    connection: {
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase
    }
  };
}

module.exports = {
  init,
  pg
};
