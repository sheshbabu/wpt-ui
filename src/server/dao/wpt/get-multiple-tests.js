const db = require("../../util/db");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

async function getMultipleTests(testIds) {
  const knex = db.getKnex();
  const rows = await knex("wpt_reports")
    .whereIn("test_id", testIds)
    .orderBy("created_at", "desc");
  if (rows) {
    return rows;
  } else {
    throw new NoTestsFoundError();
  }
}

module.exports = getMultipleTests;
