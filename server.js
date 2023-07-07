require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {connectToDB} = require("./src/db/db");
const errorHandler = require("./src/middlewares/error");
const {ignoreFiles} = require("./src/middlewares/common");
const appRoutes = require("./src/controllers/index");

// configurations
app.use(cors());
app.use(express.json());

// connect to database
connectToDB();

// ignore automatic file requests from browsers
app.use(ignoreFiles)

// main app routes
app.use(appRoutes);

// for error handling
app.use(errorHandler);

app.listen(8000, (req, res) => {
  console.log("Huzzah! Successfully running on port 8000!");
});