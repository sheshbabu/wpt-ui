const wptDao = require("../../dao/wpt");

async function getMultipleTests(req, res, next) {
  try {
    const testIds = req.query.test_id.split(",");
    const rows = await wptDao.getMultipleTests(testIds);
    res.send(rows);
  } catch (error) {
    next(error);
  }
}

module.exports = getMultipleTests;
