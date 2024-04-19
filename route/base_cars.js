const express = require("express");
const router = express.Router();

const base_carsController = require("../controller/base_cars");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(authMiddleware(["admin", "superadmin"]), base_carsController.getBaseCars)
  .post(
    authMiddleware(["admin", "superadmin"]),
    base_carsController.setBaseCar
  );

router
  .route("/:id")
  .get(authMiddleware(["admin", "superadmin"]), base_carsController.getBaseCar)
  .put(authMiddleware(["admin", "superadmin"]), base_carsController.putBaseCar)
  .delete(
    authMiddleware(["admin", "superadmin"]),
    base_carsController.deleteBaseCar
  );

module.exports = router;
