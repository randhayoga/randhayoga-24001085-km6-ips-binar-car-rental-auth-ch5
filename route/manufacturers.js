const express = require("express");
const router = express.Router();

const manufacturersController = require("../controller/manufacturers");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(
    authMiddleware(["admin", "superadmin"]),
    manufacturersController.getManufacturers
  )
  .post(
    authMiddleware(["admin", "superadmin"]),
    manufacturersController.setManufacturer
  );

router
  .route("/:id")
  .get(
    authMiddleware(["admin", "superadmin"]),
    manufacturersController.getManufacturer
  )
  .put(
    authMiddleware(["admin", "superadmin"]),
    manufacturersController.putManufacturer
  )
  .delete(
    authMiddleware(["admin", "superadmin"]),
    manufacturersController.deleteManufacturer
  );

module.exports = router;
