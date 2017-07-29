const knex = require("knex");
let pg = null;

function init(config) {
  initKnex(config);
  return migrateKnex();
}

function initKnex(config) {
  const knexConfig = getKnexConfig(config);
  pg = knex(knexConfig);
}

function migrateKnex() {
  return pg.migrate.latest();
}

function getKnexConfig(config) {
  let connection = {};

  if (config.dbConnectionString) {
    connection = config.dbConnectionString;
  } else {
    connection = {
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase
    };
  }

  return {
    client: "pg",
    connection
  };
}

module.exports = {
  init,
  pg
};
