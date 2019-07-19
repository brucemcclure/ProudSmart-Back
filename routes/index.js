const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UsersRoutes = require("./users_routes");
const CoursesRoutes = require("./courses_routes");
const PaymentsRoutes = require("./payments_routes");
const AdminRoutes = require("./admin_routes.js");
const ProfileImgRoutes = require("./profileImage_routes");
const passport = require("passport");
const { checkRole } = require("./../middleware/auth_middleware");

router.get("/", (req, res) => res.send("Welcome"));

router.use("/auth", AuthRoutes);

router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UsersRoutes
);

router.use("/courses", CoursesRoutes);

router.use(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  PaymentsRoutes
);

// checkRole is a custom authentication middle which prevents all but the admin user from accessing the admin routes
router.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    checkRole(req, res, next, ["admin"]);
  },
  AdminRoutes
);

router.use("/image-upload", ProfileImgRoutes); //Joshua, change this test to a proper router name if you want

module.exports = router;
