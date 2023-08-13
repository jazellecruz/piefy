const chalk = require("chalk");
const {ClientError, ServerError} = require("../classes/index");
const error = chalk.hex("#e03453");

const errorHandler = (err, req, res, next) => {
  console.log(`${error.italic("Error Type")}: ${err.constructor.name}`);
  console.log("-----  START OF ERROR  -----");
  console.log(err);
  console.log("-----  END OF ERROR  -----");

  if(err.httpCode === 400) {
    return res.status(err.httpCode).send({msg: err.clientMessage});
  }

  if(err.httpCode === 404) {
    return res.redirect("/error/not-found");
  }

  res.redirect("/error/internal-error");
}

module.exports = errorHandler