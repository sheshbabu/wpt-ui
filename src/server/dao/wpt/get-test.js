const db = require("../../util/db");
const NoTestFoundError = require("../../errors/NoTestFoundError");

async function getTest(testId) {
  const knex = db.getKnex();
  const row = await knex("wpt_reports").where({ test_id: testId });
  if (row && row[0]) {
    return row[0];
  } else {
    throw new NoTestFoundError(testId);
  }
}

module.exports = getTest;
