const express = require("express");
const runTest = require("./run-test");
const updateTest = require("./update-test");

const router = express.Router();

router.all("/run", runTest);
router.all("/update", updateTest);

module.exports = router;
