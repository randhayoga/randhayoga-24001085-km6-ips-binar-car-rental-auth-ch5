const express = require("express");
const router = express.Router();

const manufacturersController = require("../controller/manufacturers");

router
  .route("/")
  .get(manufacturersController.getManufacturers)
  .post(manufacturersController.setManufacturer);

router
  .route("/:id")
  .get(manufacturersController.getManufacturer)
  .put(manufacturersController.putManufacturer)
  .delete(manufacturersController.deleteManufacturer);

module.exports = router;
