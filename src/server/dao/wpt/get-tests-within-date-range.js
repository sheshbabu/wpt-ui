const db = require("../../util/db");
const NoTestsFoundForDateRangeError = require("../../errors/NoTestsFoundForDateRangeError");

async function getTestsWithinDateRange(startDate, endDate) {
  const knex = db.getKnex();
  const rows = await knex("wpt_reports")
    .whereBetween("created_at", [startDate, endDate])
    .orderBy("created_at", "desc");
  if (rows.length) {
    return rows;
  } else {
    throw new NoTestsFoundForDateRangeError();
  }
}

module.exports = getTestsWithinDateRange;
