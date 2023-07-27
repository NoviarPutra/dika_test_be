const path = require("path");
const { config } = require("dotenv");
const { customAlphabet } = require("nanoid/async");
const { add, getAll, update, remove } = require("../models/brands.model");

config();
module.exports = {
  addBrand: async (req, res, next) => {
    try {
      const generateID = customAlphabet("123456", 6);
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
      )}/assets/img_brands/${fileName}`;
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
      file.mv(`./src/assets/img_brands/${fileName}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        const payload = {
          id: parseInt(await generateID()),
          name: req.body.name,
          photo: url,
          created_by: req.body.created_by,
          updated_by: req.body.updated_by,
        };
        const response = await add(payload);
        if (response) {
          res.status(201).json({ message: "CREATED" });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  getBrands: async (req, res, next) => {
    try {
      const response = await getAll();
      res.status(200).json({
        message: "Success",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  updateBrand: async (req, res, next) => {
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
      )}/assets/img_brands/${fileName}`;
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
      file.mv(`./src/assets/img_brands/${fileName}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        const payload = {
          name: req.body.name,
          photo: url,
          updated_by: req.body.updated_by,
        };
        console.log(payload);
        const response = await update(req.params.id, payload);
        if (response) {
          res.status(200).json({ message: "UPDATED" });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  deleteBrand: async (req, res, next) => {
    try {
      await remove(req.params.id);
      res.status(200).json({
        message: "Delete Success",
      });
    } catch (error) {
      next(error);
    }
  },
};
