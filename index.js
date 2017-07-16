const express = require("express");

const app = express();

function init(config = {}) {
  app.locals.config = config;
}

function start() {
  const port = app.locals.config.port || 3000;
  app.listen(port);
}

module.exports = {
  init,
  start
};
