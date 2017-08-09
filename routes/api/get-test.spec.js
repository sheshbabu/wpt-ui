const assert = require("assert");
const sinon = require("sinon");
const proxyquire = require("proxyquire");
const NoTestFoundError = require("../../errors/NoTestFoundError");

describe("ApiRouter - getTest", () => {
  let getTestRouteHandler,
    getTestDaoStub,
    requestMock,
    responseMock,
    nextStub,
    responseSendStub;

  beforeEach(() => {
    getTestDaoStub = sinon.stub();
    responseSendStub = sinon.stub();
    getTestRouteHandler = proxyquire("./get-test.js", {
      "../../dao/wpt": {
        getTest: getTestDaoStub
      }
    });
    requestMock = {
      params: {
        test_id: "xxx"
      }
    };
    responseMock = {
      send: responseSendStub
    };
    nextStub = sinon.stub();
  });

  afterEach(() => {
    getTestDaoStub = null;
    getTestRouteHandler = null;
    requestMock = null;
    responseMock = null;
    nextStub = null;
    responseSendStub = null;
  });

  it("should call wptDao.getTest with the testId passed in queryparams", () => {
    getTestRouteHandler(requestMock, responseMock, nextStub);
    assert(getTestDaoStub.calledOnce);
    assert(getTestDaoStub.calledWith("xxx"));
  });

  it("should send the row in the response", async () => {
    const row = { testId: "xxx", status: "completed" };
    getTestDaoStub.resolves(row);
    await getTestRouteHandler(requestMock, responseMock, nextStub);
    assert(responseSendStub.calledWith(row));
  });

  it("should send the error in the next callback", async () => {
    const error = new NoTestFoundError("xxx");
    getTestDaoStub.rejects(error);
    await getTestRouteHandler(requestMock, responseMock, nextStub);
    assert(nextStub.calledWith(error));
  });
});
