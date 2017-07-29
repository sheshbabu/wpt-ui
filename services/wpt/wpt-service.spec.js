const assert = require("assert");
const sinon = require("sinon");
const axios = require("axios");
const proxyquire = require("proxyquire");
const WptRunTestError = require("../../errors/WptRunTestError");

const config = {
  wptUrl: "www.test.com",
  wptApiKey: "xyz",
  wptLocation: "ec2-ap-southeast-1:Chrome.Cable",
  wptRuns: 5
};

const successResponse = {
  data: {
    statusCode: 200,
    statusText: "Ok",
    data: {
      testId: "xxx",
      ownerKey: "yyy",
      jsonUrl: "http://www.webpagetest.org/jsonResult.php?test=xxx",
      xmlUrl: "http://www.webpagetest.org/xmlResult/xxx/",
      userUrl: "http://www.webpagetest.org/result/xxx/",
      summaryCSV: "http://www.webpagetest.org/result/xxx/page_data.csv",
      detailCSV: "http://www.webpagetest.org/result/xxx/requests.csv"
    }
  }
};

const failureResponse = {
  data: {
    statusCode: 400,
    statusText: "Invalid URL, please try submitting your test request again."
  }
};

describe("wptService", () => {
  describe("runTest", () => {
    let wptService, wptDaoCreatePendingTestStub, requestStub;

    beforeEach(() => {
      wptDaoCreatePendingTestStub = sinon.stub().resolves();
      wptService = proxyquire("./wpt-service", {
        "../../dao/wpt": {
          createPendingTest: wptDaoCreatePendingTestStub
        }
      });
      requestStub = sinon.stub(axios, "get");
    });

    afterEach(() => {
      axios.get.restore();
    });

    it("should call webpagetest endpoint for running tests", () => {
      requestStub.resolves(successResponse);
      wptService.runTest(config);
      const expected = "http://www.webpagetest.org/runtest.php";
      const actual = requestStub.firstCall.args[0];
      assert.strictEqual(actual, expected);
    });

    it("should map the config to request params", () => {
      requestStub.resolves(successResponse);
      wptService.runTest(config);
      const expected = {
        params: {
          url: "www.test.com",
          k: "xyz",
          location: "ec2-ap-southeast-1:Chrome.Cable",
          runs: 5,
          f: "json"
        }
      };
      const actual = requestStub.firstCall.args[1];
      assert.deepStrictEqual(actual, expected);
    });

    it("should call wptDao.createPendingTest with testId for success response", async () => {
      requestStub.resolves(successResponse);
      await wptService.runTest(config);
      const expected = successResponse.data.data.testId;
      const actual = wptDaoCreatePendingTestStub.firstCall.args[0];
      assert(wptDaoCreatePendingTestStub.calledOnce);
      assert.strictEqual(actual, expected);
    });

    it("should throw WptRunTestError for failure response", async () => {
      requestStub.resolves(failureResponse);
      try {
        await wptService.runTest(config);
      } catch (error) {
        assert(error instanceof WptRunTestError);
      }
    });
  });
});
