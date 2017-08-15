const express = require("express");
const runTest = require("./run-test");
const updateTest = require("./update-test");

const router = express.Router();

router.use("/run", runTest);
router.use("/update", updateTest);

module.exports = router;
