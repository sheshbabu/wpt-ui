const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/db");
const client = require("./util/client");
const logger = require("./util/logger");
const wptHooksRouter = require("./routes/wpt-hooks");

const app = express();

app.use(bodyParser.json());
app.use(express.static(client.buildPath));

app.use((req, res, next) => {
  logger.info({ req, res });
  logger.info({ body: req.body });
  next();
});

app.use("/hooks", wptHooksRouter);

async function start(config = {}) {
  registerConfig(config);
  await initDb();
  await client.runBuild();
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
