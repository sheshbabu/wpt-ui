const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const db = require("./util/db");
const logger = require("./util/logger");
const apiRouter = require("./routes/api");
const webhookRouter = require("./routes/webhook");
const StatusCodes = require("../common/constants/StatusCodes.json");

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../../build")));

app.use((req, res, next) => {
  logger.info({ req });
  next();
});

app.use("/webhook", webhookRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const message = err.message || "Something went wrong!";
  const errorCode = err.errorCode || 0;
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  logger.error({ req, err });
  res.status(statusCode).send({ message, errorCode });
});

async function start(config) {
  registerConfig(config);
  await initDb();
  startServer();
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
  await db.runMigration();
  await db.seed();
}

function startServer() {
  const port = app.locals.config.port;
  logger.info(`Listening in port: ${port}`);
  app.listen(port);
}

module.exports = {
  start
};
