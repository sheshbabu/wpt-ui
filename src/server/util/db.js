const path = require("path");

const migrationDirPath = path.resolve(__dirname, "../migrations");
const seedDirPath = path.resolve(__dirname, "../seeds");
let knex = null;

function init(config) {
  const knexConfig = getKnexConfig(config);
  knex = require("knex")(knexConfig);
}

function getKnex() {
  return knex;
}

function runMigration() {
  return knex.migrate.latest({ directory: migrationDirPath });
}

function rollbackMigration() {
  return knex.migrate.rollback({ directory: migrationDirPath });
}

function seed() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return knex.seed.run({ directory: seedDirPath });
  }
  return Promise.resolve();
}

function getKnexConfig(config) {
  return {
    client: "pg",
    connection: config.dbConnectionString
  };
}

module.exports = {
  init,
  runMigration,
  rollbackMigration,
  seed,
  getKnex
};
