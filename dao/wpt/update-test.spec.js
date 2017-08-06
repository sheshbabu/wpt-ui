const assert = require("assert");
const updateTestWptDao = require("./update-test.js");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const mappedTestResultFixture = require("../../test/fixtures/wpt/mapped-test-result.json");

initDb();

describe("WptDao - updateTest", () => {
  const knex = db.getKnex();
  const testId = "xyz";
  const jsonUrl = "www.xyz.com";

  beforeEach(async () => {
    await knex.migrate.rollback();
    await db.migrate();
    return knex("wpt_reports").insert({
      test_id: testId,
      status: "pending",
      json_url: jsonUrl
    });
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  it("should update a row with provided values", async () => {
    await updateTestWptDao(testId, mappedTestResultFixture);
    const row = await knex("wpt_reports").where({ test_id: testId });
    assert.strictEqual(row[0].test_id, testId);
    Object.keys(mappedTestResultFixture).forEach(key => {
      if (
        key === "fv_domain_breakdown" ||
        key === "fv_content_breakdown" ||
        key === "rv_domain_breakdown" ||
        key === "rv_content_breakdown"
      ) {
        assert.deepStrictEqual(
          row[0][key],
          JSON.parse(mappedTestResultFixture[key])
        );
      } else {
        assert.deepStrictEqual(row[0][key], mappedTestResultFixture[key]);
      }
    });
  });
});
