const db = require("../../util/db");
const EmptyWptReportsTableError = require("../../errors/EmptyWptReportsTableError");

async function getTests() {
  const knex = db.getKnex();
  const rows = await knex("wpt_reports")
    .orderBy("created_at", "desc")
    .limit(10);
  if (rows.length) {
    return rows;
  } else {
    throw new EmptyWptReportsTableError();
  }
}

module.exports = getTests;
