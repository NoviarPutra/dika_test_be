const { customAlphabet } = require("nanoid/async");
const { hashSync, genSaltSync, compare } = require("bcrypt");
const { addUser, loginUser } = require("../models/users.model");
const path = require("path");
const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");
config();

module.exports = {
  register: async (req, res, next) => {
    try {
      const generateID = customAlphabet("123456", 6);
      const hashPassword = hashSync(req.body.password, genSaltSync(10));
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
      )}/assets/img_users/${fileName}`;
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
      file.mv(`./src/assets/img_users/${fileName}`, async (err) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }
        const payload = {
          id: parseInt(await generateID()),
          email: req.body.email,
          password: hashPassword,
          fullname: req.body.fullname,
          photo: url,
        };
        const response = await addUser(payload);
        if (response) {
          res.status(201).json({ message: "CREATED" });
        }
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const response = await loginUser(req.body.email);
      if (!response[0]) {
        throw new Error(`Email not found!`);
      }
      const match = await compare(req.body.password, response[0].password);
      if (!match) {
        throw new Error(`Wrong Password!`);
      }
      const token = sign(
        {
          id: response[0].id,
          email: response[0].email,
          fullname: response[0].fullname,
          photo: response[0].photo,
        },
        process.env.SECRET_ACCESS,
        { expiresIn: 86400 }
      );
      res.status(200).json({
        message: "Login Success",
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },
};
