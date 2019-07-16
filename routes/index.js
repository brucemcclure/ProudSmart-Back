const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UsersRoutes = require("./users_routes");

router.get("/", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);
router.use("/users", UsersRoutes);

module.exports = router;