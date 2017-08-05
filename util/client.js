const path = require("path");
const util = require("util");
const child_process = require("child_process");
const logger = require("./logger");

const buildPath = path.resolve(process.cwd(), "./client/build");

async function runBuild() {
  const exec = util.promisify(child_process.exec);
  try {
    logger.info("Building client files ...");
    await exec("npm run build", {
      cwd: path.resolve(process.cwd(), "./client")
    });
    logger.info("Building client files done");
    return Promise.resolve();
  } catch (err) {
    logger.info({ err });
  }
}

module.exports = {
  runBuild,
  buildPath
};
