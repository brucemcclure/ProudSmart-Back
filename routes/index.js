const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UsersRoutes = require("./users_routes");
const CoursesRoutes = require("./courses_routes");
const PaymentsRoutes = require("./payments_routes");
const passport = require("passport");

router.get("/", (req, res) => res.send("Welcome"));
router.use("/auth", AuthRoutes);
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UsersRoutes
);
router.use("/courses", CoursesRoutes);
router.use("/payments", PaymentsRoutes);

module.exports = router;
