const getMultipleTests = require("./get-multiple-tests");
const getTestsWithinDateRange = require("./get-tests-within-date-range");
const wptDao = require("../../dao/wpt");

async function getTests(req, res, next) {
  if (req.query.start_date && req.query.end_date) {
    return getTestsWithinDateRange(req, res, next);
  }

  if (req.query.test_id) {
    return getMultipleTests(req, res, next);
  }

  try {
    const rows = await wptDao.getTests();
    res.send(rows);
  } catch (error) {
    next(error);
  }
}

module.exports = getTests;
