const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: "wpt-ui",
  serializers: {
    err: bunyan.stdSerializers.err,
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

module.exports = logger;
