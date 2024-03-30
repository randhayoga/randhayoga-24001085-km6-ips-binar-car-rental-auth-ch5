const express = require("express");
const router = express.Router();

const cars_trimsController = require("../controller/cars_trims");

router
  .route("/")
  .get(cars_trimsController.getCarsTrims)
  .post(cars_trimsController.setCarsTrim);

router
  .route("/:id")
  .get(cars_trimsController.getCarsTrim)
  .put(cars_trimsController.putCarsTrim)
  .delete(cars_trimsController.deleteCarsTrim);

module.exports = router;
