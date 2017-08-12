const express = require("express");
const router = express.Router();
const createTest = require("./create-test");
const getTest = require("./get-test");
const getTests = require("./get-tests");

router.post("/tests", createTest);
router.get("/tests", getTests);
router.get("/tests/:test_id", getTest);

module.exports = router;
