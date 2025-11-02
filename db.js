var mysql = require("mysql2/promise");
var dotenv = require("dotenv");
dotenv.config();

var db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  timezone: "Z",
  charset: "utf8mb4"
});

module.exports = db; 
