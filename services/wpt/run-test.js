const axios = require("axios");
const logger = require("../../util/logger");
const wptDao = require("../../dao/wpt");
const WptRunTestError = require("../../errors/WptRunTestError");

async function runTest(config) {
  const RUN_TEST_URL = "http://www.webpagetest.org/runtest.php";
  const params = getWptParams(config);
  const response = await axios.get(RUN_TEST_URL, { params });
  const body = response.data;
  logger.info({ response: body });
  if (body.statusCode === 200) {
    const { testId } = body.data;
    logger.info({ testId });
    return wptDao.createPendingTest(testId);
  } else if (body.statusCode === 400) {
    throw new WptRunTestError(body);
  }
}

function getWptParams(config) {
  return {
    url: config.wptUrl,
    k: config.wptApiKey,
    location: config.wptLocation,
    pingback: config.wptPingbackUrl,
    runs: config.wptRuns,
    f: "json"
  };
}

module.exports = runTest;
