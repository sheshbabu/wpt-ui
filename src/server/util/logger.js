const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: "wpt-ui",
  serializers: {
    err: bunyan.stdSerializers.err,
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

if (process.env.NODE_ENV === "test") {
  logger.level(bunyan.FATAL + 1); // Any level above "FATAL" mutes the logger
}

module.exports = logger;
