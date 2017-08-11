const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const testResultFixture = require("../../test/fixtures/wpt/test-result.json");
const mappedTestResultFixture = require("../../test/fixtures/wpt/mapped-test-result.json");

describe("WptService - updateTest", () => {
  let updateTest, wptDaoUpdateTestStub, wptDaoGetTestStub, axiosGetStub;
  const testId = "xyz";
  const jsonUrl = `www.wpt.com/result?testId=${testId}`;

  beforeEach(() => {
    wptDaoGetTestStub = sinon.stub();
    wptDaoUpdateTestStub = sinon.stub();
    axiosGetStub = sinon.stub();
    updateTest = proxyquire("./update-test.js", {
      "../../dao/wpt": {
        getTest: wptDaoGetTestStub,
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

  it("should pass the testId to wptDao.getTest", async () => {
    wptDaoGetTestStub.resolves({ json_url: jsonUrl });
    axiosGetStub.resolves({ data: testResultFixture });
    wptDaoUpdateTestStub.resolves();
    await updateTest(testId);
    assert(wptDaoGetTestStub.calledWith(testId));
  });

  it("should make a GET request to the url provided by wptDao.getTest", async () => {
    wptDaoGetTestStub.resolves({ json_url: jsonUrl });
    axiosGetStub.resolves({ data: testResultFixture });
    wptDaoUpdateTestStub.resolves();
    await updateTest(testId);
    assert(axiosGetStub.calledWith(jsonUrl));
  });

  it("should map the raw response and pass it to wptDao.updateTest", async () => {
    wptDaoGetTestStub.resolves({ json_url: jsonUrl });
    axiosGetStub.resolves({ data: testResultFixture });
    wptDaoUpdateTestStub.resolves();
    await updateTest(testId);
    const expected = mappedTestResultFixture;
    const actual = wptDaoUpdateTestStub.firstCall.args[1];
    assert.deepStrictEqual(actual, expected);
  });
});
