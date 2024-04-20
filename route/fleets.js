const express = require("express");
const router = express.Router();

const fleetsController = require("../controller/fleets");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(authMiddleware(["admin", "superadmin"]), fleetsController.getFleets)
  .post(authMiddleware(["admin", "superadmin"]), fleetsController.setFleet);

router.route("/available").get(fleetsController.getAvailableFleets);

router
  .route("/:id")
  .get(authMiddleware(["admin", "superadmin"]), fleetsController.getFleet)
  .put(authMiddleware(["admin", "superadmin"]), fleetsController.putFleet)
  .delete(
    authMiddleware(["admin", "superadmin"]),
    fleetsController.deleteFleet
  );

module.exports = router;
