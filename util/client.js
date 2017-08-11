const path = require("path");
const util = require("util");
const child_process = require("child_process");
const logger = require("./logger");

const clientPath = path.resolve(__dirname, "../client");
const buildPath = path.resolve(clientPath, "./build");

async function runBuild() {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  try {
    const exec = util.promisify(child_process.exec);
    const options = { cwd: clientPath };

    logger.info("Installing client dependencies ...");
    await exec("npm install", options);
    logger.info("Installing client dependencies done");

    logger.info("Building client files ...");
    await exec("npm run build", options);
    logger.info("Building client files done");
  } catch (err) {
    logger.info({ err });
  }
}

module.exports = {
  runBuild,
  buildPath
};
