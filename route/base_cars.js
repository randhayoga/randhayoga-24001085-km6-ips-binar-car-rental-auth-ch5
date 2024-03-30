const express = require("express");
const router = express.Router();

const base_carsController = require("../controller/base_cars");

router
  .route("/")
  .get(base_carsController.getBaseCars)
  .post(base_carsController.setBaseCar);

router
  .route("/:id")
  .get(base_carsController.getBaseCar)
  .put(base_carsController.putBaseCar)
  .delete(base_carsController.deleteBaseCar);

module.exports = router;
