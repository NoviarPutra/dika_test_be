const express = require("express");
const { authToken } = require("../middlewares/authentication");

const { addOrders } = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", [authToken], addOrders);

module.exports = router;
