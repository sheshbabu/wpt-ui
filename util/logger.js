const bunyan = require("bunyan");
const logger = bunyan.createLogger({ name: "wpt-ui" });

module.exports = logger;
