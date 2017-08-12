const wptDao = require("../../dao/wpt");

async function getTestsWithinDateRange(req, res, next) {
  try {
    const { start_date, end_date } = req.query;
    const rows = await wptDao.getTestsWithinDateRange(start_date, end_date);
    res.send(rows);
  } catch (error) {
    next(error);
  }
}

module.exports = getTestsWithinDateRange;
