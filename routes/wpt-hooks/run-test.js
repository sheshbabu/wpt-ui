const wptService = require("../../services/wpt");

function runTest(req, res) {
  const config = res.app.locals.config;
  wptService.runTest(config);
  res.end();
}

module.exports = runTest;
