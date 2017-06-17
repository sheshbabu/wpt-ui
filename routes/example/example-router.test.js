const assert = require("assert");
const httpMocks = require("node-mocks-http");
const exampleRouteHandler = require("./example-router");

describe("Example Router", () => {
  let mockRequest, mockResponse;

  before(() => {
    mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/example"
    });
    mockResponse = httpMocks.createResponse();
  });

  it("should return 'hello world' for GET /example", () => {
    exampleRouteHandler(mockRequest, mockResponse);
    const actualResponseBody = mockResponse._getData();
    const expectedResponseBody = "hello world!";
    assert(actualResponseBody, expectedResponseBody);
  });
});
