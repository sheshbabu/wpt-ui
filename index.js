const express = require("express");
const db = require("./util/db");
const logger = require("./util/logger");
const wptRouter = require("./routes/wpt");

const app = express();
app.use("/api/tests", wptRouter);

async function start(config = {}) {
  registerConfig(config);
  await initDb();
  startServer();
}

function registerConfig(config) {
  app.locals.config = config;
}

function initDb() {
  return db.init(app.locals.config);
}

function startServer() {
  const port = app.locals.config.port || 3000;
  logger.info(`Staring app in port: ${port}`);
  app.listen(port);
}

module.exports = {
  start
};
