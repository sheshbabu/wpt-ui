const dotenv = require("dotenv");
const { start } = require("./src/server");

dotenv.load();

module.exports = { start };
