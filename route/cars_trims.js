const express = require("express");
const router = express.Router();

const cars_trimsController = require("../controller/cars_trims");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(
    authMiddleware(["admin", "superadmin"]),
    cars_trimsController.getCarsTrims
  )
  .post(
    authMiddleware(["admin", "superadmin"]),
    cars_trimsController.setCarsTrim
  );

router
  .route("/:id")
  .get(
    authMiddleware(["admin", "superadmin"]),
    cars_trimsController.getCarsTrim
  )
  .put(
    authMiddleware(["admin", "superadmin"]),
    cars_trimsController.putCarsTrim
  )
  .delete(
    authMiddleware(["admin", "superadmin"]),
    cars_trimsController.deleteCarsTrim
  );

module.exports = router;
