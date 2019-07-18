const express = require("express");
const router = express.Router();
const PaymentsController = require("../controllers/payments_controller");

router.post("/charge", PaymentsController.charge);

module.exports = router;
