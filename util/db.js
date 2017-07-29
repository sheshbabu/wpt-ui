const path = require("path");
const knex = require("knex");

let pg = null;
let wptReportsTable = null;

function init(config) {
  initKnex(config);
  return migrateKnex();
}

function initKnex(config) {
  const knexConfig = getKnexConfig(config);
  pg = knex(knexConfig);
  wptReportsTable = pg("wpt_reports");
}

function migrateKnex() {
  const migrationDirPath = path.join(__dirname, "../migrations");
  return pg.migrate.latest({ directory: migrationDirPath });
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
  wptReportsTable
};
