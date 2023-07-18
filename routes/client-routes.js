const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client-controller");

router.get("/getallcoins", clientController.getallcoins);
router.get("/getallcurrencies", clientController.getallcurrencies);
router.get("/getCurrencyRemmitance", clientController.getCurrencyRemmitance);
router.get("/getNotificaton", clientController.getNotificaton);

router.post(
  "/getCurrencyArchiveForChart",
  clientController.getArchiveForCurrency
);
router.post("/getCoinArchiveForChart", clientController.getArchiveForCoin);

module.exports = router;
