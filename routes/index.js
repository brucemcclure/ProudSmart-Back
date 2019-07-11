const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes")

router.get("/", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);

module.exports = router;