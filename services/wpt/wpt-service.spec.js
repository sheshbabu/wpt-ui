const assert = require("assert");
const sinon = require("sinon");
const axios = require("axios");
const wptService = require("./wpt-service");
const WptRunTestError = require("../../errors/WptRunTestError");

const config = {
  wptUrl: "www.test.com",
  wptApiKey: "xyz",
  wptLocation: "ec2-ap-southeast-1:Chrome.Cable",
  wptRuns: 5
};

const successResponse = {
  body: {
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
  body: {
    statusCode: 400,
    statusText: "Invalid URL, please try submitting your test request again."
  }
};

describe("wptService", () => {
  describe("runTest", () => {
    let requestStub;
    beforeEach(() => {
      requestStub = sinon.stub(axios, "get");
    });
    afterEach(() => {
      axios.get.restore();
    });
    it("should call webpagetest endpoint for running tests", () => {
      requestStub.resolves(successResponse);
      wptService.runTest(config);
      const expectedOutput = "http://www.webpagetest.org/runtest.php";
      const actualOutput = requestStub.firstCall.args[0];
      assert.strictEqual(actualOutput, expectedOutput);
    });
    it("should map the config to request params", () => {
      requestStub.resolves(successResponse);
      wptService.runTest(config);
      const expectedOutput = {
        params: {
          url: "www.test.com",
          k: "xyz",
          location: "ec2-ap-southeast-1:Chrome.Cable",
          runs: 5,
          f: "json"
        }
      };
      const actualOutput = requestStub.firstCall.args[1];
      assert.deepStrictEqual(actualOutput, expectedOutput);
    });
    it("should throw WptRunTestError if it gets statusCode 400 from api", async () => {
      requestStub.resolves(failureResponse);
      try {
        await wptService.runTest(config);
      } catch (error) {
        assert(error instanceof WptRunTestError);
      }
    });
  });
});
