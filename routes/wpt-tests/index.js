const express = require("express");
const createWptTest = require("./create-wpt-test");

const router = express.Router();

router.post("/", createWptTest);

module.exports = router;
