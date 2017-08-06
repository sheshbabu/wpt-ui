const testData1 = require("../test/seeds/wpt_reports_completed_test_1.json");
const testData2 = require("../test/seeds/wpt_reports_completed_test_2.json");
const testData3 = require("../test/seeds/wpt_reports_completed_test_3.json");
const testData4 = require("../test/seeds/wpt_reports_completed_test_4.json");
const testData5 = require("../test/seeds/wpt_reports_completed_test_5.json");

exports.seed = async function(knex) {
  await knex("wpt_reports").del();
  await insert(knex, testData1);
  await insert(knex, testData2);
  await insert(knex, testData3);
  await insert(knex, testData4);
  await insert(knex, testData5);
  return Promise.resolve();
};

function insert(knex, data) {
  data.fv_domain_breakdown = JSON.stringify(data.fv_domain_breakdown);
  data.fv_content_breakdown = JSON.stringify(data.fv_content_breakdown);
  data.rv_domain_breakdown = JSON.stringify(data.rv_domain_breakdown);
  data.rv_content_breakdown = JSON.stringify(data.rv_content_breakdown);
  return knex("wpt_reports").insert(data);
}
