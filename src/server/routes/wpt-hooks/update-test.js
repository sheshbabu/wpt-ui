const wptService = require("../../services/wpt");

function updateTest(req, res) {
  const testId = req.query.id;
  wptService.updateTest(testId);
  res.end();
}

module.exports = updateTest;
