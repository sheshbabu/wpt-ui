const axios = require("axios");
const logger = require("../../util/logger");

async function runTest(config) {
  const RUN_TEST_URL = "http://www.webpagetest.org/runtest.php";
  const params = getWptParams(config);
  try {
    const response = await axios.get(RUN_TEST_URL, { params });
    logger.info({ res: response });
  } catch (e) {
    logger.error({ err: e });
  }
}

function getWptParams(config) {
  return {
    url: config.wptUrl,
    k: config.wptApiKey,
    location: config.wptLocation,
    runs: config.wptRuns,
    f: "json"
  };
}

module.exports = {
  runTest
};
