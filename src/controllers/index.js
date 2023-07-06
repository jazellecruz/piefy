const router = require("express").Router();
const {db} = require("../db/db");

// home page
router.get("/", async(req, res, next) => {
  try{
    res.send("Welcome to piefy! A perfect slice for your long URLs 🍰");
  } catch(err) {
    next(err);
  }
});

// for fetching urls
router.get("/:url_code", async(req, res, next) => {
  try{
    res.send(req.params.url_code);
    let result = await db.query("SELECT * FROM urls;");
    console.log(result.rows);
  } catch(err) {
    next(err);
  }
});

// for adding new urls
router.post("/", async(req, res, next) => {
  try{
    console.log(req.body.url);
  } catch(err) {
    next(err);
  }
});

module.exports = router