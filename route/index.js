const express = require("express");
const router = express.Router();

const manufacturers = require("./manufacturers");
const base_cars = require("./base_cars");
const cars_trims = require("./cars_trims");
const fleets = require("./fleets");

router.use("/manufacturers", manufacturers);
router.use("/base_cars", base_cars);
router.use("/cars_trims", cars_trims);
router.use("/fleets", fleets);

module.exports = router;
