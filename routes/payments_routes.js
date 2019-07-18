const express = require("express");
const router = express.Router();
const PaymentsController = require("../controllers/payments_controller");
const passport = require("passport");

router.post("/charge", passport.authenticate("jwt", { session: false }), PaymentsController.charge);

module.exports = router;
