const express = require("express");
const { register } = require("../controllers/users.contoller");

const router = express.Router();

router.post("/", register);

module.exports = router;
