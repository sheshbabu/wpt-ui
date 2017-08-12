const pendingTestData1 = require("../test/seeds/wpt_reports_pending_test_1.json");

const completedTestData1 = require("../test/seeds/wpt_reports_completed_test_1.json");
const completedTestData2 = require("../test/seeds/wpt_reports_completed_test_2.json");
const completedTestData3 = require("../test/seeds/wpt_reports_completed_test_3.json");
const completedTestData4 = require("../test/seeds/wpt_reports_completed_test_4.json");
const completedTestData5 = require("../test/seeds/wpt_reports_completed_test_5.json");

exports.seed = async function(knex) {
  await knex("wpt_reports").del();

  await insert(knex, pendingTestData1);

  await insert(knex, completedTestData1);
  await insert(knex, completedTestData2);
  await insert(knex, completedTestData3);
  await insert(knex, completedTestData4);
  await insert(knex, completedTestData5);
};

function insert(knex, data) {
  data.fv_domain_breakdown = JSON.stringify(data.fv_domain_breakdown);
  data.fv_content_breakdown = JSON.stringify(data.fv_content_breakdown);
  data.rv_domain_breakdown = JSON.stringify(data.rv_domain_breakdown);
  data.rv_content_breakdown = JSON.stringify(data.rv_content_breakdown);
  return knex("wpt_reports").insert(data);
}
