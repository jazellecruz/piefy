const { db } = require("../db/db");
const { v4 : uuidv4 } = require("uuid");
const { nanoid }= require("nanoid")
const { generateCharLength } = require("../utils/index");

const addNewUrl = async(url) => {
  try{
    let urlCodeLength = generateCharLength();

    let ext_id = uuidv4();
    let url_code = nanoid(urlCodeLength);

    // use parameterized query
    let query = "INSERT INTO urls (ext_id, url_code, url, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING url_code;"
    let values = [ext_id, url_code, url]

    let result = await db.query(query, values)

    return result.rows[0].url_code
  } catch(err) {
    throw err;
  }
} 

const fetchUrl = async(urlCode) => {
  try{

    // use parameterized query
    let query = "SELECT url FROM urls WHERE url_code = $1;";
    let values = [urlCode];

    let foundUrl = await db.query(query, values);
    let url = foundUrl.rows[0].url

    if (!url.includes("http://") || !url.includes("https://")){
      url = `https://${url}`;
    }

    return url;
  } catch(err) {
    throw err;
  }
}

module.exports = {addNewUrl, fetchUrl}