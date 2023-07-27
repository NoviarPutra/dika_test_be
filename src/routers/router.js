const userRouter = require("./users.routes");
const brandRouter = require("./brands.routes");
const vehicleRouter = require("./vehicle.routes");
const orderRouter = require("./orders.routes");
module.exports = (app) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/vehicles", vehicleRouter);
  app.use("/api/v1/orders", orderRouter);
};
