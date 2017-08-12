const db = require("../../util/db");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

async function getTests() {
  const knex = db.getKnex();
  const rows = await knex("wpt_reports")
    .orderBy("created_at", "desc")
    .limit(10);
  if (rows) {
    return rows;
  } else {
    throw new NoTestsFoundError();
  }
}

module.exports = getTests;
