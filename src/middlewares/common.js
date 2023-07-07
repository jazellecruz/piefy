
/**
 * I hate this :')
 * See https://stackoverflow.com/questions/64616507/favicon-ico-passed-as-url-param-in-node for the problem.
 */
const ignoreFiles = (req, res, next) => {
  let param = req.originalUrl.split("/").pop();

  if(param === "favicon.ico" || 
    param === "robots.txt" || 
    param === "manifest.json" || 
    param === "sitemap.xml"
  ) {
    return res.status(204).end();
  }

  next();
}

module.exports = {ignoreFiles}