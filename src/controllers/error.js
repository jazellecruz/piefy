const router = require("express").Router();
const BaseError = require("../classes/index");

router.get("/not-found", (req, res, next) => {
  try{
    res.render("notFound");
  } catch(err) {
    next(new BaseError(500, err));
  }
});

router.get("/internal-error", (req, res, next) => {
  try{
    res.render("internalError");
  } catch(err) {
    next(new BaseError(500, err));
  }
});

module.exports = router