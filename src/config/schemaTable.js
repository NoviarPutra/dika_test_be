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

const brandTable = `
CREATE TABLE IF NOT EXISTS brands (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by INT NOT NULL,
  updated_by INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
)
`;

const vehicleTable = `
CREATE TABLE IF NOT EXISTS vehicles (
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  vehicle_brand_id INT NOT NULL,
  photo VARCHAR(255) NOT NULL,
  price DECIMAL(19,4) NOT NULL,
  year INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (vehicle_brand_id) REFERENCES brands(id)
)
`;

const ordersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INT NOT NULL,
  user_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
)
`;

dbConn.connect(() => {
  console.log(`CONNECTED`);
  dbConn.query(ordersTable, (err, result) => {
    if (err) throw err;
    console.log(`TABLE CREATED`);
  });
});
