const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UsersRoutes = require("./users_routes");
const CoursesRoutes = require("./courses_routes");
const PaymentsRoutes = require("./payments_routes");
const AdminRoutes = require("./admin_routes.js");
const passport = require("passport");

router.get("/", (req, res) => res.send("Welcome"));

router.use(
  "/auth", 
  AuthRoutes
);

router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UsersRoutes
);

router.use(
  "/courses", 
  CoursesRoutes
);

router.use(
  "/payments", 
  passport.authenticate("jwt", { session: false }), 
  PaymentsRoutes
);

router.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  AdminRoutes
)

module.exports = router;
