const { customAlphabet } = require("nanoid/async");
const { hashSync, genSaltSync, compare } = require("bcrypt");
const { addUser, loginUser } = require("../models/users.model");

module.exports = {
  register: async (req, res, next) => {
    try {
      const generateID = customAlphabet("123456", 6);
      const hashPassword = hashSync(req.body.password, genSaltSync(10));
      const payload = {
        id: parseInt(await generateID()),
        email: req.body.email,
        password: hashPassword,
        fullname: req.body.fullname,
        photo: req.body.photo,
      };
      const response = await addUser(payload);
      if (response) {
        res.status(201).json({ message: "CREATED" });
      }
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
      res.status(200).json({
        message: "Login Success",
        token: "token here",
      });
    } catch (error) {
      next(error);
    }
  },
};
