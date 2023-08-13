const { Client } = require("pg");

const DB_URI = process.env.DB_URI;
const MAX_RETRY_ATTEMPTS = 5;

const db = new Client({
  connectionString: DB_URI,
  ssl: {
    required: true
  }
});

const connectToDB = async(retryCount = 0) => {
  try{
    await db.connect();
    console.log("Successfully connected to database!");
  } catch(err) {
    console.log(err)
    if(retryCount < MAX_RETRY_ATTEMPTS) {
      const delay = (retryCount + 1) * 5 * 1000;

      setTimeout(() => connectToDB(retryCount + 1), delay);
      console.log(`Failed to connect to database. Retrying in ${delay / 1000}s`);
      return;
    }

    console.log("FAILED TO CONNECT TO DATABASE.")
    console.log(err);
    process.exit(1);
  }

} 

module.exports = {connectToDB, db}