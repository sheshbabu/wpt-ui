const express = require("express");
const exampleRouteHandler = require("./example-router");

const router = express.Router();

router.get("/", exampleRouteHandler);

module.exports = router;
