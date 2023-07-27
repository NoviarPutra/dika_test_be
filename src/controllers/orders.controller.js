const path = require("path");
const { config } = require("dotenv");
const { customAlphabet } = require("nanoid/async");
const { add, getAll, update, remove } = require("../models/brands.model");
const {
  addProduct,
  getAllProducts,
  removeProduct,
  updateProduct,
} = require("../models/vehicles.model");
const { addOrder } = require("../models/orders.model");

config();
module.exports = {
  addOrders: async (req, res, next) => {
    try {
      const generateID = customAlphabet("123456", 6);
      const payload = {
        id: parseInt(await generateID()),
        // user_id: parseInt(req.body.user_id),
        vehicle_id: parseInt(req.body.vehicle_id),
      };
      const response = await addOrder(payload);
      if (response) {
        res.status(201).json({ message: "CREATED" });
      }
    } catch (error) {
      next(error);
    }
  },
  getVehicle: async (req, res, next) => {
    try {
      const response = await getAllProducts();
      res.status(200).json({
        message: "Success",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  updateVehicle: async (req, res, next) => {
    try {
      if (req.files === null) {
        res.status(400).json({
          message: "No File Uploaded",
        });
      }
      const file = req.files.photo;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get(
        "host"
      )}/assets/img_vehicles/${fileName}`;
      const allowedType = [".png", ".jpg", ".jpeg"];
      if (!allowedType.includes(ext.toLocaleLowerCase())) {
        res.status(422).json({
          message: "Invalid Image",
        });
      }
      if (fileSize > 5000000) {
        res.status(422).json({
          message: "Image must be less than 5mb",
        });
      }
      file.mv(`./src/assets/img_vehicles/${fileName}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        const payload = {
          name: req.body.name,
          vehicle_brand_id: req.body.vehicle_brand_id,
          photo: url,
          price: req.body.price,
          year: req.body.year,
        };
        const response = await updateProduct(req.params.id, payload);
        if (response) {
          res.status(200).json({ message: "UPDATED" });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  deleteVehicle: async (req, res, next) => {
    try {
      await removeProduct(req.params.id);
      res.status(200).json({
        message: "Delete Success",
      });
    } catch (error) {
      next(error);
    }
  },
};
