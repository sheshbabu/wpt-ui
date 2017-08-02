const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const testResultFixture = require("../../test/fixtures/wpt/test-result.json");
const mappedTestResultFixture = require("../../test/fixtures/wpt/mapped-test-result.json");

describe("WptService - updateTest", () => {
  let updateTest, wptDaoUpdateTestStub, wptDaoGetJsonUrlStub, axiosGetStub;

  beforeEach(() => {
    wptDaoGetJsonUrlStub = sinon.stub();
    wptDaoUpdateTestStub = sinon.stub();
    axiosGetStub = sinon.stub();
    updateTest = proxyquire("./update-test.js", {
      "../../dao/wpt": {
        getJsonUrl: wptDaoGetJsonUrlStub,
        updateTest: wptDaoUpdateTestStub
      },
      axios: {
        get: axiosGetStub
      }
    });
  });

  afterEach(() => {
    wptDaoUpdateTestStub = null;
    axiosGetStub = null;
    updateTest = null;
  });

  it("should pass the testId to wptDao.getJsonUrl", async () => {
    const testId = "xyz";
    wptDaoGetJsonUrlStub.resolves();
    axiosGetStub.resolves({ data: testResultFixture });
    wptDaoUpdateTestStub.resolves();
    await updateTest(testId);
    assert(wptDaoGetJsonUrlStub.calledWith(testId));
  });

  it("should make a GET to the url provided by wptDao.getJsonUrl", async () => {
    const testId = "xyz";
    const jsonUrl = `www.wpt.com/result?testId=${testId}`;
    wptDaoGetJsonUrlStub.resolves(jsonUrl);
    axiosGetStub.resolves({ data: testResultFixture });
    wptDaoUpdateTestStub.resolves();
    await updateTest(testId);
    assert(axiosGetStub.calledWith(jsonUrl));
  });

  it("should map the raw response and pass it to wptDao.updateTest", async () => {
    const testId = "xyz";
    const jsonUrl = `www.wpt.com/result?testId=${testId}`;
    wptDaoGetJsonUrlStub.resolves(jsonUrl);
    axiosGetStub.resolves({ data: testResultFixture });
    wptDaoUpdateTestStub.resolves();
    await updateTest(testId);
    const expected = mappedTestResultFixture;
    const actual = wptDaoUpdateTestStub.firstCall.args[1];
    assert.deepStrictEqual(actual, expected);
  });
});
