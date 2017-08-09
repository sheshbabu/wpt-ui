const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

describe("ApiRouter - getTests", () => {
  let getTestsRouteHandler,
    getTestsDaoStub,
    getMultipleTestsRouteHandlerStub,
    getTestsWithinDateRangeRouteHandlerStub,
    requestMock,
    responseMock,
    nextStub,
    responseSendStub;

  beforeEach(() => {
    getTestsDaoStub = sinon.stub();
    getMultipleTestsRouteHandlerStub = sinon.stub();
    getTestsWithinDateRangeRouteHandlerStub = sinon.stub();
    responseSendStub = sinon.stub();
    getTestsRouteHandler = proxyquire("./get-tests.js", {
      "../../dao/wpt": {
        getTests: getTestsDaoStub
      },
      "./get-multiple-tests": getMultipleTestsRouteHandlerStub,
      "./get-tests-within-date-range": getTestsWithinDateRangeRouteHandlerStub
    });
    requestMock = {
      query: {}
    };
    responseMock = {
      send: responseSendStub
    };
    nextStub = sinon.stub();
  });

  afterEach(() => {
    getTestsDaoStub = null;
    getTestsRouteHandler = null;
    getMultipleTestsRouteHandlerStub = null;
    getTestsWithinDateRangeRouteHandlerStub = null;
    requestMock = null;
    responseMock = null;
    nextStub = null;
    responseSendStub = null;
  });

  it("should call wptDao.getTests if there are no query params", () => {
    getTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(getTestsDaoStub.calledOnce);
  });

  it("should call the getTestsWithinDateRange route handler if there are start_date and end_date query params", () => {
    requestMock = {
      query: {
        start_date: 1,
        end_date: 1
      }
    };
    getTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(getTestsWithinDateRangeRouteHandlerStub.calledOnce);
  });

  it("should call the getMultipleTests route handler if there is test_id query param", () => {
    requestMock = {
      query: {
        test_id: 1
      }
    };
    getTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(getMultipleTestsRouteHandlerStub.calledOnce);
  });

  it("should send the rows in the response", async () => {
    const rows = [{ testId: "xxx" }, { testId: "yyy" }];
    getTestsDaoStub.resolves(rows);
    await getTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(responseSendStub.calledWith(rows));
  });

  it("should send the error in the next callback", async () => {
    const error = new NoTestsFoundError("xxx");
    getTestsDaoStub.rejects(error);
    await getTestsRouteHandler(requestMock, responseMock, nextStub);
    assert(nextStub.calledWith(error));
  });
});
