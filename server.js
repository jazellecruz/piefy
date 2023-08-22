require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {connectToDB} = require("./src/db/db");
const errorHandler = require("./src/middlewares/error");
const {ignoreFiles} = require("./src/middlewares/common");
const api = require("./src/controllers/api");
const client = require("./src/controllers/client");
const error = require("./src/controllers/error.js")

// configurations
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// connect to database
connectToDB();

// ignore automatic file requests from browsers
app.use(ignoreFiles)

// main app routes
app.use(client);
app.use(api);

// for error handling
app.use(errorHandler);

// route for err
app.use("/error", error);

app.listen(8000, (req, res) => {
  console.log("Huzzah! Successfully running on port 8000!");
});