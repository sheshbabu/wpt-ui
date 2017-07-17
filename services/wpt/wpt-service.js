const axios = require("axios");
const logger = require("../../util/logger");

async function runTest(config) {
  const RUN_TEST_URL = "http://www.webpagetest.org/runtest.php";
  const params = getWptParams(config);
  try {
    const response = await axios.get(RUN_TEST_URL, { params });
    logger.info({ response: response.data });
    if (response.data.statusCode === 200) {
      const testId = response.data.data.testId;
      const jsonUrl = response.data.data.jsonUrl;
      logger.info({ testId, jsonUrl });
    } else if (response.data.statusCode === 400) {
      throw new Error("Bad request");
    }
  } catch (err) {
    logger.error({ err });
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
