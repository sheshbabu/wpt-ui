const db = require("../../util/db");

function updateTest(testId, result) {
  const knex = db.getKnex();
  return knex("wpt_reports").where({ test_id: testId }).update(result);
}

module.exports = updateTest;
