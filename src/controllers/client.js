const router = require("express").Router();
const BaseError = require("../classes/index");

router.get("/", async(req, res, next) => {
  try{
    res.render("index");
  } catch(err) {
    next(new BaseError(500, err));
  }
});

module.exports = router