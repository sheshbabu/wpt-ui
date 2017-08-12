const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const NoTestsFoundError = require("../../errors/NoTestsFoundError");

describe("ApiRouter - getTestsWithinDateRange", () => {
  let getTestsWithinDateRangeRouteHandler,
    getTestsWithinDateRangeDaoStub,
    requestMock,
    responseMock,
    nextStub,
    responseSendStub;

  beforeEach(() => {
    getTestsWithinDateRangeDaoStub = sinon.stub();
    responseSendStub = sinon.stub();
    getTestsWithinDateRangeRouteHandler = proxyquire(
      "./get-tests-within-date-range.js",
      {
        "../../dao/wpt": {
          getTestsWithinDateRange: getTestsWithinDateRangeDaoStub
        }
      }
    );
    requestMock = {
      query: {
        start_date: "xxx",
        end_date: "yyy"
      }
    };
    responseMock = {
      send: responseSendStub
    };
    nextStub = sinon.stub();
  });

  afterEach(() => {
    getTestsWithinDateRangeDaoStub = null;
    getTestsWithinDateRangeRouteHandler = null;
    requestMock = null;
    responseMock = null;
    nextStub = null;
    responseSendStub = null;
  });

  it("should call wptDao.getTestsWithinDateRange with the start_date and end_date passed in queryparams", () => {
    getTestsWithinDateRangeRouteHandler(requestMock, responseMock, nextStub);
    assert(getTestsWithinDateRangeDaoStub.calledOnce);
    assert(getTestsWithinDateRangeDaoStub.calledWith("xxx", "yyy"));
  });

  it("should send the rows in the response", async () => {
    const rows = [{ testId: "xxx" }, { testId: "yyy" }];
    getTestsWithinDateRangeDaoStub.resolves(rows);
    await getTestsWithinDateRangeRouteHandler(
      requestMock,
      responseMock,
      nextStub
    );
    assert(responseSendStub.calledWith(rows));
  });

  it("should send the error in the next callback", async () => {
    const error = new NoTestsFoundError();
    getTestsWithinDateRangeDaoStub.rejects(error);
    await getTestsWithinDateRangeRouteHandler(
      requestMock,
      responseMock,
      nextStub
    );
    assert(nextStub.calledWith(error));
  });
});
