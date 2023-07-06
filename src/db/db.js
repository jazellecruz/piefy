const { Client } = require("pg");

const db = new Client({
  host: "127.0.0.1",
  post: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

const connectToDB = async() => {
  try{
    await db.connect();
    console.log("Successfully connected to database!");
  } catch(err) {
    console.log("ERROR CONNECTING TO DATABASE:")
    console.log(err);
  }
} 

module.exports = {connectToDB, db}