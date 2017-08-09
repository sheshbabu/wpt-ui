const assert = require("assert");
const httpMocks = require("node-mocks-http");
const proxyquire = require("proxyquire");
const sinon = require("sinon");

const config = {
  wptUrl: "www.test.com",
  wptApiKey: "xyz",
  wptLocation: "ec2-ap-southeast-1:Chrome.Cable",
  wptPingbackUrl: "www.pingback.com",
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

describe("ApiRouter - createTest", () => {
  let createTestRouteHandler, req, res, runTestServiceStub;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    runTestServiceStub = sinon.stub();
    createTestRouteHandler = proxyquire("./create-test", {
      "../../services/wpt": {
        runTest: runTestServiceStub
      }
    });
  });

  afterEach(() => {
    req = null;
    res = null;
    runTestServiceStub = null;
    createTestRouteHandler = null;
  });

  it("should return 200 for POST /api/tests", () => {
    createTestRouteHandler(req, res);
    const actualStatusCode = res.statusCode;
    const expectedStatusCode = 200;
    assert(actualStatusCode, expectedStatusCode);
  });

  it("should call 'wptService.runTest' with config present in res.app.locals", () => {
    createTestRouteHandler(req, res);
    assert(runTestServiceStub.calledOnce);
    assert(runTestServiceStub.calledWith(config));
  });
});
