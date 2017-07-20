const assert = require("assert");
const httpMocks = require("node-mocks-http");
const proxyquire = require("proxyquire");
const sinon = require("sinon");

const config = {
  wptUrl: "www.test.com",
  wptApiKey: "xyz",
  wptLocation: "ec2-ap-southeast-1:Chrome.Cable",
  wptRuns: 5
};

function mockRequest() {
  return httpMocks.createRequest({
    method: "POST",
    url: "/api/tests"
  });
}

function mockResponse() {
  let res = httpMocks.createResponse();
  res.app = {
    locals: { config }
  };
  return res;
}

describe("createWptTest", () => {
  let createWptTest, req, res, runTestStub;

  before(() => {
    req = mockRequest();
    res = mockResponse();
    runTestStub = sinon.stub();
    createWptTest = proxyquire("./create-wpt-test", {
      "../../services/wpt": {
        runTest: runTestStub
      }
    });
  });

  it("should return 200 for POST /api/tests", () => {
    createWptTest(req, res);
    const actualStatusCode = res.statusCode;
    const expectedStatusCode = 200;
    assert(actualStatusCode, expectedStatusCode);
  });

  it("should call 'wptService.runTest' with config present in res.app.locals", () => {
    createWptTest(req, res);
    assert(runTestStub.calledOnce);
    assert(runTestStub.calledWith(config));
  });
});
