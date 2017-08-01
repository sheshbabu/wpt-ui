const express = require("express");
const runTest = require("./run-test");

const router = express.Router();

router.use("/run", runTest);

module.exports = router;
