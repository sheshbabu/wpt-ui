const db = require("../../util/db");

function createTest(testId, jsonUrl) {
  const knex = db.getKnex();
  return knex("wpt_reports").insert({
    test_id: testId,
    status: "pending",
    json_url: jsonUrl
  });
}

module.exports = createTest;
