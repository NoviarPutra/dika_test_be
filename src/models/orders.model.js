const dbConn = require("../config/db.config");

module.exports = {
  addOrder: (payload) => {
    const sql = `
    INSERT INTO orders (id,user_id,vehicle_id,created_at,updated_at) VALUES ?`;
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
  getAllProducts: () => {
    const sql = `
    SELECT vehicles.name as vehicleName, vehicles.vehicle_brand_id, brands.name as vehicleBrand, vehicles.photo, vehicles.price, vehicles.year, vehicles.created_at, vehicles.updated_at FROM vehicles
    LEFT JOIN brands ON vehicles.vehicle_brand_id = brands.id
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
  updateProduct: (id, payload) => {
    const sql = `
    UPDATE vehicles 
    SET name = '${payload.name}',vehicle_brand_id = '${payload.vehicle_brand_id}', photo = '${payload.photo}', price = '${payload.price}',year = '${payload.year}'
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
  removeProduct: (id) => {
    const sql = `
    DELETE FROM vehicles WHERE id = '${id}'
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
