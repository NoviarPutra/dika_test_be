const { customAlphabet } = require("nanoid/async");
const { hashSync, genSaltSync } = require("bcrypt");
const { addUser } = require("../models/users.model");

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
};
