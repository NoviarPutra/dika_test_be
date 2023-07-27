const dbConn = require("../config/db.config");

module.exports = {
  add: (payload) => {
    const sql = `
    INSERT INTO brands (id,name,photo,created_by,updated_by) VALUES ?`;
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
  getAll: () => {
    const sql = `
    SELECT * FROM brands`;
    return new Promise((resolve, reject) => {
      dbConn.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  update: (id, payload) => {
    const sql = `
    UPDATE brands 
    SET name = '${payload.name}', photo = '${payload.photo}', updated_by = '${payload.updated_by}'
    WHERE id = '${id}'
    `;
    // const values = [Object.values(payload)];
    return new Promise((resolve, reject) => {
      dbConn.query(sql, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  remove: (id) => {
    const sql = `
    DELETE FROM brands WHERE id = '${id}'
    `;
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
