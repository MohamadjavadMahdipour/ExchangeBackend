const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.post("/updateCurrency", adminController.updateCurrency);
router.post("/updateCoin", adminController.updateCoin);
router.post("/setNotification", adminController.setNotification);
router.post(
  "/updateCurrencyRemmitance",
  adminController.updateCurrencyRemmitance
);

module.exports = router;
