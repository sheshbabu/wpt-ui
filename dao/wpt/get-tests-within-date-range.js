const db = require("../../util/db");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

async function getMultipleTests(startDate, endDate) {
  const knex = db.getKnex();
  const rows = await knex("wpt_reports").whereBetween("created_at", [
    startDate,
    endDate
  ]);
  if (rows) {
    return rows;
  } else {
    throw new NoTestsFoundError();
  }
}

module.exports = getMultipleTests;
