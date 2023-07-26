const express = require("express");
const { register, login } = require("../controllers/users.contoller");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/validation");

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

module.exports = router;
