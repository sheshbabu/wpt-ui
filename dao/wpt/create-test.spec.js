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
});
