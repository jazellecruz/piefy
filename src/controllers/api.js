const router = require("express").Router();
const { addNewUrl, fetchUrl, doesUrlExist } = require("../models/index");
const {validateUrl} = require("../utils/index");
const {ClientError, ServerError} = require("../classes/index");

// for fetching urls
router.get("/:url_code", async(req, res, next) => {
  try{
    let url = await fetchUrl(req.params.url_code);

    if(!url) {
      throw new ClientError(404, "No url found", "Resource Not Found: No matching url found from the database.");
    }

    res.redirect(url);
  } catch(err) {
    /**
     * If error is akready defined, rethrow.
     * If not, wrap in the custom error with 500 http code and the original error
     */
    if(err instanceof ClientError || err instanceof ServerError){
      return next(err);
    }

    next(new ServerError(500, err));
  }
});

// for adding new urls
router.post("/", async(req, res, next) => {
  try{
    // use the custom url validator to accept http urls only
    let validatedUrl = validateUrl(req.body.url)

    if(!validatedUrl){
      throw new ClientError(400, "Invalid Url", "Given input is not a url.")
    }

    /**
     * Check if url already exists in the database
     * if so, send the corresponding shortened url
     */
    let url = await doesUrlExist(validatedUrl)

    if(!url) {
      url = await addNewUrl(validatedUrl);
    }

    res.send({url: url});
  } catch(err) {
     /**
     * If error is akready defined, rethrow.
     * If not, wrap in the custom error with 500 http code and the original error
     */
     if(err instanceof ClientError || err instanceof ServerError){
      return next(err);
    }

    next(new ServerError(500, err));
  }
});

module.exports = router
