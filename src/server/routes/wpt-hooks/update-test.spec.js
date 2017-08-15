const assert = require("assert");
const httpMocks = require("node-mocks-http");
const proxyquire = require("proxyquire");
const sinon = require("sinon");

const config = {
  wptUrl: "www.test.com",
  wptApiKey: "xyz",
  wptLocation: "ec2-ap-southeast-1:Chrome.Cable",
  publicUrl: "http://www.pingback.com",
  wptRuns: 5
};

function mockRequest() {
  return httpMocks.createRequest({
    method: "GET",
    url: "/hooks/update",
    query: {
      id: 42
    }
  });
}

function mockResponse() {
  let res = httpMocks.createResponse();
  res.app = {
    locals: { config }
  };
  return res;
}

describe("WptHooksRouter - updateTest", () => {
  let updateTestRouteHandler, req, res, updateTestServiceStub;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    updateTestServiceStub = sinon.stub();
    updateTestRouteHandler = proxyquire("./update-test.js", {
      "../../services/wpt": {
        updateTest: updateTestServiceStub
      }
    });
  });

  afterEach(() => {
    req = null;
    res = null;
    updateTestServiceStub = null;
    updateTestRouteHandler = null;
  });

  it("should return 200 for GET /hooks/update", () => {
    updateTestRouteHandler(req, res);
    const actualStatusCode = res.statusCode;
    const expectedStatusCode = 200;
    assert(actualStatusCode, expectedStatusCode);
  });

  it("should call 'wptService.updateTest' with testId present in query params", () => {
    updateTestRouteHandler(req, res);
    assert(updateTestServiceStub.calledOnce);
    assert(updateTestServiceStub.calledWith(42));
  });
});
