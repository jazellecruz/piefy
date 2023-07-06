
const errorHandler = (err, req, res, next) => {
  console.log("An error occured:");
  console.log("-----  START OF ERROR  -----");
  console.log(err);
  console.log("-----  END OF ERROR  -----");
}

module.exports = errorHandler