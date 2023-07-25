const dbConn = require("./db.config");

const userTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    photo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
)
`;

dbConn.connect(() => {
  console.log(`CONNECTED`);
  dbConn.query(userTable, (err, result) => {
    if (err) throw err;
    console.log(`TABLE CREATED`);
  });
});
