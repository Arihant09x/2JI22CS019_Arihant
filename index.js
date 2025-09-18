const express = require("express");
const { log } = require("./logger");
const urlcontoller = require("./controller");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", urlcontoller);

app.get("/healthCheck", (req, res) => {
  res.status(200).send("i am alive");
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
  log("backend", "info", "service", "Server started on port " + PORT);
});
