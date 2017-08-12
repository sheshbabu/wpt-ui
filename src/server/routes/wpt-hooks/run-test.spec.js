const assert = require("assert");
const proxyquire = require("proxyquire");
const sinon = require("sinon");

describe("WptHooksRouter - runTest", () => {
  let runTestRouteHandler, createTestApiRouteHandlerStub;

  beforeEach(() => {
    createTestApiRouteHandlerStub = sinon.stub();
    runTestRouteHandler = proxyquire("./run-test", {
      "../api/create-test": createTestApiRouteHandlerStub
    });
  });

  afterEach(() => {
    createTestApiRouteHandlerStub = null;
    runTestRouteHandler = null;
  });

  it("should delegate to api router by calling 'createTestApiRouteHandler'", () => {
    runTestRouteHandler();
    assert(createTestApiRouteHandlerStub.calledOnce);
  });
});
