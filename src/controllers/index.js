const router = require("express").Router();
const { addNewUrl, fetchUrl, doesUrlExist } = require("../models/index");
const {validateUrl} = require("../utils/index");

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
    // use the custom url validator to accept http urls only
    let validatedUrl = validateUrl(req.body.url)

    if(!validatedUrl){
      return res.status(400).send("invalid url");
    }

    /**
     * Check if url already exists in the database
     * if so, send the corresponding shortende url
     */
    let url = await doesUrlExist(validatedUrl)

    if(!url) {
      url = await addNewUrl(validatedUrl);
    }
  
    res.send(url);
  } catch(err) {
    next(err);
  }
});

module.exports = router
