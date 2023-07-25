const { config } = require("dotenv");
const { createConnection } = require("mysql");

config();

const dbConn = createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log("CONNECTED MYSQL");
});

module.exports = dbConn;
