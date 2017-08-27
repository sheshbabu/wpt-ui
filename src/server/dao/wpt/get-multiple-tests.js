const db = require("../../util/db");
const NoTestFoundError = require("../../errors/NoTestFoundError");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

async function getMultipleTests(testIds) {
  const knex = db.getKnex();
  const rows = await knex("wpt_reports")
    .whereIn("test_id", testIds)
    .orderBy("created_at", "desc");
  if (rows.length === testIds.length) {
    return rows;
  } else if (rows.length && rows.length < testIds.length) {
    const missingTestIds = rows.filter(row => !testIds.includes[row.test_id]);
    throw new NoTestFoundError(missingTestIds[0].test_id);
  } else {
    throw new NoTestsFoundError();
  }
}

module.exports = getMultipleTests;
