const express = require("express");
const createTest = require("./create-test");

const router = express.Router();

router.post("/", createTest);

module.exports = router;
