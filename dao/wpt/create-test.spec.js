const assert = require("assert");
const proxyquire = require("proxyquire");

function getKnex() {
  const config = {
    client: "pg",
    connection: "postgres://sheshbabu:password@localhost:5432/wpt-ui-test"
  };
  return require("knex")(config);
}

describe("WptDao - createTest", () => {
  const knex = getKnex();
  const testId = "xyz";
  const jsonUrl = "www.xyz.com";
  let createTestWptDao;

  beforeEach(async () => {
    createTestWptDao = proxyquire("./create-test.js", {
      "../../util/db": {
        getKnex
      }
    });
    await knex.migrate.rollback();
    return knex.migrate.latest();
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  it("should create a row with 'test_id' field set to what was passed as argument", async () => {
    await createTestWptDao(testId, jsonUrl);
    const row = await knex("wpt_reports").where({ test_id: testId });
    assert.strictEqual(row[0].test_id, testId);
  });

  it("should create a row with 'json_url' field set to what was passed as argument", async () => {
    await createTestWptDao(testId, jsonUrl);
    const row = await knex("wpt_reports").where({ test_id: testId });
    assert.strictEqual(row[0].json_url, jsonUrl);
  });

  it("should create a row with 'status' field set to 'pending'", async () => {
    await createTestWptDao(testId, jsonUrl);
    const row = await knex("wpt_reports").where({ test_id: testId });
    assert.strictEqual(row[0].status, "pending");
  });

  it("should create a row with other fields set to default values", async () => {
    await createTestWptDao(testId, jsonUrl);
    const row = await knex("wpt_reports").where({ test_id: testId });
    assert.strictEqual(row[0].url, "");
    assert.strictEqual(row[0].summary_url, "");
    assert.strictEqual(row[0].location, "");
    assert.strictEqual(row[0].connectivity, "");
    assert.strictEqual(row[0].browser_name, "");
    assert.strictEqual(row[0].browser_version, "");
    assert.strictEqual(row[0].fv_ttfb, 0);
    assert.strictEqual(row[0].fv_first_paint, 0);
    assert.strictEqual(row[0].fv_start_render, 0);
    assert.strictEqual(row[0].fv_last_visual_change, 0);
    assert.strictEqual(row[0].fv_visual_complete, 0);
    assert.strictEqual(row[0].fv_load_time, 0);
    assert.strictEqual(row[0].fv_fully_loaded, 0);
    assert.strictEqual(row[0].fv_speed_index, 0);
    assert.strictEqual(row[0].fv_requests_made, 0);
    assert.strictEqual(row[0].fv_bytes_downloaded, 0);
    assert.deepStrictEqual(row[0].fv_domain_breakdown, {});
    assert.deepStrictEqual(row[0].fv_content_breakdown, {});
    assert.strictEqual(row[0].rv_ttfb, 0);
    assert.strictEqual(row[0].rv_first_paint, 0);
    assert.strictEqual(row[0].rv_start_render, 0);
    assert.strictEqual(row[0].rv_last_visual_change, 0);
    assert.strictEqual(row[0].rv_visual_complete, 0);
    assert.strictEqual(row[0].rv_load_time, 0);
    assert.strictEqual(row[0].rv_fully_loaded, 0);
    assert.strictEqual(row[0].rv_speed_index, 0);
    assert.strictEqual(row[0].rv_requests_made, 0);
    assert.strictEqual(row[0].rv_bytes_downloaded, 0);
    assert.deepStrictEqual(row[0].rv_domain_breakdown, {});
    assert.deepStrictEqual(row[0].rv_content_breakdown, {});
  });
});
