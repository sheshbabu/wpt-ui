const path = require("path");

let knex = null;

function init(config) {
  initKnex(config);
  return migrateKnex();
}

function getKnex() {
  return knex;
}

function initKnex(config) {
  const knexConfig = getKnexConfig(config);
  knex = require("knex")(knexConfig);
}

function migrateKnex() {
  const migrationDirPath = path.join(__dirname, "../migrations");
  return knex.migrate.latest({ directory: migrationDirPath });
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
  getKnex
};
