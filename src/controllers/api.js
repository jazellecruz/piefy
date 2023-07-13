const router = require("express").Router();
const { addNewUrl, fetchUrl } = require("../models/index");
const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl

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
    let sanitizedUrl = sanitizeUrl(req.body.url);

    /**
     * the library returns about:blank as a replacement if url is invalid
     * so just send a status to let the client know its an invalid url
     */ 
    if (sanitizedUrl === "about:blank"){
      return res.status(400).send("invalid url");
    }

    let urlCode = await addNewUrl(sanitizedUrl);
    let newUrl = `http://localhost:8000/${urlCode}`

    res.send(newUrl);
  } catch(err) {
    next(err);
  }
});

module.exports = router