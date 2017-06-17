const express = require("express");
const exampleRouter = require("./routes/example");

const app = express();

app.use("/example", exampleRouter);

app.listen(3000);
