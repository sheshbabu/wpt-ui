const assert = require("assert");
const getMultipleTests = require("./get-multiple-tests");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const NoTestFoundError = require("../../errors/NoTestFoundError");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

initDb();

describe("WptDao - getMultipleTests", () => {
  beforeEach(async () => {
    await db.rollbackMigration();
    await db.runMigration();
    await db.seed();
  });

  afterEach(async () => {
    await db.rollbackMigration();
  });

  it("should return the rows that have the provided testIds", async () => {
    const testIds = ["170608_AA_CMPL", "170709_CC_CMPL"];
    const rows = await getMultipleTests(testIds);
    assert.strictEqual(rows.length, 2);
    assert.strictEqual(rows[0].test_id, "170709_CC_CMPL");
    assert.strictEqual(rows[1].test_id, "170608_AA_CMPL");
  });

  it("should throw a NoTestFoundError if some of the tests are not found for the provided testIds", async () => {
    try {
      const testIds = ["170709_CC_CMPL", "170709_CC_CMPL_XXX_2000"];
      await getMultipleTests(testIds);
    } catch (error) {
      assert(error instanceof NoTestFoundError);
    }
  });

  it("should throw a NoTestsFoundError if no tests are found for the provided testIds", async () => {
    try {
      const testIds = ["170608_AA_CMPL_XXX_1000", "170709_CC_CMPL_XXX_2000"];
      await getMultipleTests(testIds);
    } catch (error) {
      assert(error instanceof NoTestsFoundError);
    }
  });
});
