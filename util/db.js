const path = require("path");

let knex = null;

function init(config) {
  const knexConfig = getKnexConfig(config);
  knex = require("knex")(knexConfig);
}

function getKnex() {
  return knex;
}

function migrate() {
  const migrationDirPath = path.join(__dirname, "../migrations");
  return knex.migrate.latest({ directory: migrationDirPath });
}

function seed() {
  if (process.env.NODE_ENV === "development") {
    return knex.seed.run();
  }
  return Promise.resolve();
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
  migrate,
  seed,
  getKnex
};
