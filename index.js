const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./util/db");
const client = require("./util/client");
const logger = require("./util/logger");
const apiRouter = require("./routes/api");
const wptHooksRouter = require("./routes/wpt-hooks");

dotenv.load();

const app = express();

app.use(bodyParser.json());
app.use(express.static(client.buildPath));

app.use((req, res, next) => {
  logger.info({ req });
  next();
});

app.use("/hooks", wptHooksRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const message = err.message || "Oops! Something broke!";
  logger.error({ req, err });
  res.status(500).send({ message });
});

async function start(config) {
  registerConfig(config);
  // Eagerly listening to port before DB migration and client build finishes
  // To prevent Heroku from throwing error that process failed to bind to port in 60s
  startServer();
  await initDb();
  await client.runBuild();
}

function registerConfig(config) {
  const defaults = {
    dbConnectionString: process.env.DATABASE_URL,
    port: 3000
  };
  app.locals.config = Object.assign({}, defaults, config);
  logger.info({ config: app.locals.config }, "Registered config:");
}

async function initDb() {
  db.init(app.locals.config);
  await db.seed();
  return db.migrate();
}

function startServer() {
  const port = app.locals.config.port;
  logger.info(`Listening in port: ${port}`);
  app.listen(port);
}

module.exports = {
  start
};
