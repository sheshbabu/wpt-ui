const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

describe("ApiRouter - getMultipleTests", () => {
  let getMultipleTestsRouteHandler,
    getMultipleTestsDaoStub,
    requestMock,
    responseMock,
    nextStub,
    responseSendStub;

  beforeEach(() => {
    getMultipleTestsDaoStub = sinon.stub();
    responseSendStub = sinon.stub();
    getMultipleTestsRouteHandler = proxyquire("./get-multiple-tests.js", {
      "../../dao/wpt": {
        getMultipleTests: getMultipleTestsDaoStub
      }
    });
    requestMock = {
      query: {
        test_id: "xxx,yyy"
      }
    };
    responseMock = {
      send: responseSendStub
    };
    nextStub = sinon.stub();
  });

  afterEach(() => {
    getMultipleTestsDaoStub = null;
    getMultipleTestsRouteHandler = null;
    requestMock = null;
    responseMock = null;
    nextStub = null;
    responseSendStub = null;
  });

  it("should call wptDao.getMultipleTests with the test_id passed in queryparams", () => {
    getMultipleTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(getMultipleTestsDaoStub.calledOnce);
    assert(getMultipleTestsDaoStub.calledWith(["xxx", "yyy"]));
  });

  it("should send the rows in the response", async () => {
    const rows = [{ testId: "xxx" }, { testId: "yyy" }];
    getMultipleTestsDaoStub.resolves(rows);
    await getMultipleTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(responseSendStub.calledWith(rows));
  });

  it("should send the error in the next callback", async () => {
    const error = new NoTestsFoundError();
    getMultipleTestsDaoStub.rejects(error);
    await getMultipleTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(nextStub.calledWith(error));
  });
});
