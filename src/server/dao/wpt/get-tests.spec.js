const assert = require("assert");
const getTests = require("./get-tests.js");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const NoTestsCreatedError = require("../../errors/NoTestsCreatedError");

initDb();

describe("WptDao - getTests", () => {
  const knex = db.getKnex();

  beforeEach(async () => {
    await db.rollbackMigration();
    await db.runMigration();
    await db.seed();
  });

  afterEach(async () => {
    await db.rollbackMigration();
  });

  it("should return all the 5 rows that were seeded", async () => {
    const rows = await getTests();
    assert.strictEqual(rows.length, 6);
  });

  it("should throw a NoTestsCreatedError if table is empty", async () => {
    await knex("wpt_reports").del();
    try {
      await getTests();
    } catch (error) {
      assert(error instanceof NoTestsCreatedError);
    }
  });
});
