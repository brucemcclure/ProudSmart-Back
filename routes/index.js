const express = require("express");
const router = express.Router();
const AuthRoutes = require("./auth_routes");
const UsersRoutes = require("./users_routes");
const CoursesRoutes = require("./courses_routes");
const PaymentsRoutes = require("./payments_routes");
const AdminRoutes = require("./admin_routes.js");
const ProfileImgRoutes = require("./profileImage_routes");
const videoRoutes = require("./courseVideo_routes");
const EducatorsRoutes = require("./eductorsRoutes")
const passport = require("passport");
const { checkRole } = require("./../middleware/auth_middleware");

router.get("/", (req, res) => res.send("Welcome"));

// routes associated with authentication (e.g. registeration / login forms)
router.use(
  "/auth", 
  AuthRoutes
);

// routes for the user to access their account information
router.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  UsersRoutes
);

// routes to access educator information
// note educators are also users and therefore have the same document in the database. 
// These routes use the user controller but have been seperated from the user routes for simplicity in authenitcating requests. 
router.use(
  "/educators",
  EducatorsRoutes
);

// routes to access course information
router.use(
  "/courses", 
  CoursesRoutes
);

// routes to accept payments
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

router.use(
  "/image-upload", 
  ProfileImgRoutes
); //Joshua, change this test to a proper router name if you want

router.use(
  "/video-upload", 
  videoRoutes
);

module.exports = router;
