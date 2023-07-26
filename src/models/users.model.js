const dbConn = require("../config/db.config");

module.exports = {
  addUser: (payload) => {
    const sql = `
    INSERT INTO users (id,email,password,fullname,photo) VALUES ?`;
    const values = [Object.values(payload)];
    return new Promise((resolve, reject) => {
      dbConn.query(sql, [values], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  loginUser: (email) => {
    const sql = `
    SELECT * FROM users WHERE email = '${email}'`;
    return new Promise((resolve, reject) => {
      dbConn.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
