const express = require("express");
const db = require("./util/db");
const logger = require("./util/logger");
const wptRouter = require("./routes/wpt");

const app = express();
app.use("/api/tests", wptRouter);

function init(config = {}) {
  app.locals.config = config;
  db.init(config);
}

function start() {
  const port = app.locals.config.port || 3000;
  logger.info(`Staring app in port: ${port}`);
  app.listen(port);
}

module.exports = {
  init,
  start
};
