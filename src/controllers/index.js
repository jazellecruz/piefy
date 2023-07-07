const router = require("express").Router();
const { db } = require("../db/db");
const { addNewUrl, fetchUrl } = require("../models/index");

// home page
router.get("/", async(req, res, next) => {
  try{
    res.send("Piefy. A perfect slice 🍰 for your long URLs.")
  } catch(err) {
    next(err);
  }
});

// for fetching urls
router.get("/:url_code", async(req, res, next) => {
  try{
    let url = await fetchUrl(req.params.url_code);

    res.redirect(url);
  } catch(err) {
    next(err);
  }
});

// for adding new urls
router.post("/", async(req, res, next) => {
  try{
    let urlCode = await addNewUrl(req.body.url);
    let newUrl = `http://localhost:8000/${urlCode}`

    res.send(newUrl);
  } catch(err) {
    next(err);
  }
});

module.exports = router