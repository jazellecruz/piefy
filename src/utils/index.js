
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

module.exports = {generateCharLength}

