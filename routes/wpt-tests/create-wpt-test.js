const wptService = require("../../services/wpt");

function createWptTest(req, res) {
  const config = res.app.locals.config;
  wptService.runTest(config);
  res.end();
}

module.exports = createWptTest;
