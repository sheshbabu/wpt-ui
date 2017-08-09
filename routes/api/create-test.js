const wptService = require("../../services/wpt");

function createTest(req, res) {
  const config = res.app.locals.config;
  wptService.runTest(config);
  res.end();
}

module.exports = createTest;
