const assert = require("assert");
const getMultipleTests = require("./get-multiple-tests");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

initDb();

describe("WptDao - getMultipleTests", () => {
  const knex = db.getKnex();

  beforeEach(async () => {
    await knex.migrate.rollback();
    await db.migrate();
    await db.seed();
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  it("should return the rows that have the provided testIds", async () => {
    const testIds = ["awesome_test_id_1", "awesome_test_id_3"];
    const rows = await getMultipleTests(testIds);
    assert.strictEqual(rows.length, 2);
    assert.strictEqual(rows[0].test_id, "awesome_test_id_1");
    assert.strictEqual(rows[1].test_id, "awesome_test_id_3");
  });

  it("should throw a NoTestsFoundError if no tests exist within the date range", async () => {
    try {
      const testIds = ["awesome_test_id_1000", "awesome_test_id_1001"];
      await getMultipleTests(testIds);
    } catch (error) {
      assert(error instanceof NoTestsFoundError);
    }
  });
});
