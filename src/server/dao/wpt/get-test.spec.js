const assert = require("assert");
const getTest = require("./get-test.js");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const NoTestFoundError = require("../../errors/NoTestFoundError");

initDb();

describe("WptDao - getTest", () => {
  beforeEach(async () => {
    await db.rollbackMigration();
    await db.runMigration();
    await db.seed();
  });

  afterEach(async () => {
    await db.rollbackMigration();
  });

  it("should return the matching row if it exists", async () => {
    const testId = "awesome_test_id_2";
    const row = await getTest(testId);
    assert.strictEqual(row.test_id, testId);
  });

  it("should throw a NoTestFoundError if it doesn't exist", async () => {
    try {
      const testId = "awesome_test_id_1000";
      await getTest(testId);
    } catch (error) {
      assert(error instanceof NoTestFoundError);
    }
  });
});
