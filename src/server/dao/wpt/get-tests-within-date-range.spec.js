const assert = require("assert");
const getTestsWithinDateRange = require("./get-tests-within-date-range");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

initDb();

describe("WptDao - getTestsWithinDateRange", () => {
  beforeEach(async () => {
    await db.rollbackMigration();
    await db.runMigration();
    await db.seed();
  });

  afterEach(async () => {
    await db.rollbackMigration();
  });

  it("should return the rows within the date range", async () => {
    const startDate = "2017-09-07";
    const endDate = "2017-10-31";
    const rows = await getTestsWithinDateRange(startDate, endDate);
    assert.strictEqual(rows.length, 3);
    assert.strictEqual(rows[0].test_id, "awesome_test_id_3");
    assert.strictEqual(rows[1].test_id, "awesome_test_id_4");
    assert.strictEqual(rows[2].test_id, "awesome_test_id_5");
  });

  it("should throw a NoTestsFoundError if no tests exist within the date range", async () => {
    try {
      const startDate = "2018-09-07";
      const endDate = "2018-10-30";
      await getTestsWithinDateRange(startDate, endDate);
    } catch (error) {
      assert(error instanceof NoTestsFoundError);
    }
  });
});
