const assert = require("assert");
const proxyquire = require("proxyquire");
const mappedTestResultFixture = require("../../test/fixtures/wpt/mapped-test-result.json");

function getKnex() {
  const config = {
    client: "pg",
    connection: "postgres://sheshbabu:password@localhost:5432/wpt-ui-test"
  };
  return require("knex")(config);
}

describe("WptDao - updateTest", () => {
  const knex = getKnex();
  const testId = "xyz";
  const jsonUrl = "www.xyz.com";
  let updateTestWptDao;

  beforeEach(async () => {
    updateTestWptDao = proxyquire("./update-test.js", {
      "../../util/db": {
        getKnex
      }
    });
    await knex.migrate.rollback();
    await knex.migrate.latest();
    return knex("wpt_reports").insert({
      test_id: testId,
      status: "pending",
      url: "",
      json_url: jsonUrl,
      summary_url: "",
      location: "",
      connectivity: "",
      browser_name: "",
      browser_version: "",
      fv_ttfb: 0,
      fv_first_paint: 0,
      fv_start_render: 0,
      fv_last_visual_change: 0,
      fv_visual_complete: 0,
      fv_load_time: 0,
      fv_fully_loaded: 0,
      fv_speed_index: 0,
      fv_requests_made: 0,
      fv_bytes_downloaded: 0,
      fv_domain_breakdown: {},
      fv_content_breakdown: {},
      rv_ttfb: 0,
      rv_first_paint: 0,
      rv_start_render: 0,
      rv_last_visual_change: 0,
      rv_visual_complete: 0,
      rv_load_time: 0,
      rv_fully_loaded: 0,
      rv_speed_index: 0,
      rv_requests_made: 0,
      rv_bytes_downloaded: 0,
      rv_domain_breakdown: {},
      rv_content_breakdown: {}
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
