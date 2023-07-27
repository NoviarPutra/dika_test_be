const express = require("express");
const { authToken } = require("../middlewares/authentication");
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require("../controllers/brands.controller");

const router = express.Router();

router.get("/", [authToken], getBrands);
router.post("/", [authToken], addBrand);
router.put("/:id", [authToken], updateBrand);
router.delete("/:id", [authToken], deleteBrand);

module.exports = router;
