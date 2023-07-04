const express = require("express");

const app = express();

app.listen(2424, (req, res) => {
  console.log("Huzzah! Successfully running on port 2424!");
});