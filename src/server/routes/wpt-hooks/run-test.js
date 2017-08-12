const createTestApiRouteHandler = require("../api/create-test");

function runTest(req, res) {
  return createTestApiRouteHandler(req, res);
}

module.exports = runTest;
