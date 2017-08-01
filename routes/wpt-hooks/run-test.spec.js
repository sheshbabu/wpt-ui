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
    url: "/hooks/run"
  });
}

function mockResponse() {
  let res = httpMocks.createResponse();
  res.app = {
    locals: { config }
  };
  return res;
}

describe("WptHooksRouter - runTest", () => {
  let runTestRouteHandler, req, res, runTestServiceStub;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    runTestServiceStub = sinon.stub();
    runTestRouteHandler = proxyquire("./run-test", {
      "../../services/wpt": {
        runTest: runTestServiceStub
      }
    });
  });

  afterEach(() => {
    req = null;
    res = null;
    runTestServiceStub = null;
    runTestRouteHandler = null;
  });

  it("should return 200 for POST /hooks/run", () => {
    runTestRouteHandler(req, res);
    const actualStatusCode = res.statusCode;
    const expectedStatusCode = 200;
    assert(actualStatusCode, expectedStatusCode);
  });

  it("should call 'wptService.runTest' with config present in res.app.locals", () => {
    runTestRouteHandler(req, res);
    assert(runTestServiceStub.calledOnce);
    assert(runTestServiceStub.calledWith(config));
  });
});
