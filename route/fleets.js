const express = require("express");
const router = express.Router();

const fleetsController = require("../controller/fleets");

router
  .route("/")
  .get(fleetsController.getFleets)
  .post(fleetsController.setFleet);

router
  .route("/:id")
  .get(fleetsController.getFleet)
  .put(fleetsController.putFleet)
  .delete(fleetsController.deleteFleet);

module.exports = router;
