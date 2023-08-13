const { db } = require("../db/db");
const { v4 : uuidv4 } = require("uuid");
const { nanoid }= require("nanoid")
const { generateCharLength } = require("../utils/index");
const { ServerError } = require("../classes/index");

const addNewUrl = async(url) => {
  try{
    let urlCodeLength = generateCharLength();

    let ext_id = uuidv4();
    let url_code = nanoid(urlCodeLength);

    let query = "INSERT INTO urls (ext_id, url_code, url, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING url_code;"
    let values = [ext_id, url_code, url]

    let result = await db.query(query, values);

    let urlCode = result.rows[0].url_code
    let newUrl = `http://localhost:8000/${urlCode}`

    return newUrl;
  } catch(err) {
    throw new ServerError(500, err);
  }
} 

const fetchUrl = async(urlCode) => {
  try{
    let protocolRegex = /^https?:\/\//i
    let url;

    let query = "SELECT url FROM urls WHERE url_code = $1;";
    let values = [urlCode];

    let foundUrl = await db.query(query, values);

    if(!foundUrl.rows[0]) {
      return false;
    }

    url = foundUrl.rows[0].url

    // check if url has protocol
    if (!protocolRegex.test(url)|| !protocolRegex.test(url)){
      // add https as default protocol
      url = `https://${url}`;
    }

    return url;
  } catch(err) {
    throw new ServerError(500, err);
  }
}

const doesUrlExist = async(link) => {
  try{
    let query = "SELECT url_code from urls WHERE url = $1;";
    let values = [link];

    let foundUrl = await db.query(query, values);

    if(!foundUrl.rows[0]) {
      return false;
    }

    return `http://localhost:8000/${foundUrl.rows[0].url_code}`
  } catch(err){
    throw new ServerError(500, err);
  }

}

module.exports = {addNewUrl, fetchUrl, doesUrlExist}