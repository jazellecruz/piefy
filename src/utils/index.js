const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/igm
// /^(https?:\/\/)?(www\.)?\w+\.\w+(\.\w+)?$/i;

const generateCharLength = (min = 5, max = 8) => {

  // get the diference of the max and min num of chars required
  let diff = max - min

  // generate a random number 
  let randomNum = Math.random();

  // multiply the random number and the difference then round it down
  randomNum = Math.floor(randomNum * diff);

  // add the random number to reach the limit
  randomNum = randomNum + min

  return randomNum;
}

// custom validator for validating and accepting http urls only
const validateUrl = (url) => {
  const validatedUrl = urlPattern.test(url);

  if(!validatedUrl) {
    return false;
  } else {
    return url;
  }

}


module.exports = {generateCharLength, validateUrl}

