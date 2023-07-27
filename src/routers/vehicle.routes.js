const express = require("express");
const { authToken } = require("../middlewares/authentication");
const {
  addVehicle,
  getVehicle,
  deleteVehicle,
  updateVehicle,
} = require("../controllers/vehicles.controller");

const router = express.Router();

router.get("/", [authToken], getVehicle);
router.post("/", [authToken], addVehicle);
router.put("/:id", [authToken], updateVehicle);
router.delete("/:id", [authToken], deleteVehicle);

module.exports = router;
