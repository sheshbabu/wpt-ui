const assert = require("assert");
const getTests = require("./get-tests.js");
const db = require("../../util/db");
const initDb = require("../../test/helpers/init-db");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

initDb();

describe("WptDao - getTests", () => {
  const knex = db.getKnex();

  beforeEach(async () => {
    await knex.migrate.rollback();
    await db.migrate();
    await db.seed();
  });

  afterEach(async () => {
    return knex.migrate.rollback();
  });

  it("should return all the 5 rows that were seeded", async () => {
    const rows = await getTests();
    assert.strictEqual(rows.length, 5);
  });

  it("should throw a NoTestsFoundError if table is empty", async () => {
    await knex("wpt_reports").del();
    try {
      await getTests();
    } catch (error) {
      assert(error instanceof NoTestsFoundError);
    }
  });
});
