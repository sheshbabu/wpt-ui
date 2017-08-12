const wptDao = require("../../dao/wpt");

async function getTest(req, res, next) {
  try {
    const row = await wptDao.getTest(req.params.test_id);
    res.send(row);
  } catch (error) {
    next(error);
  }
}

module.exports = getTest;
