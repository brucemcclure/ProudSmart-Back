const express = require("express");
const router = express.Router();
const CoursesController = require("../controllers/courses_controller");
const {checkRole} = require("./../middleware/auth_middleware");
const passport = require("passport");

// Route to request a list of all the courses in the database
router.get("/", CoursesController.index);

// Route to request all of the information required to enable a user preview a given course
router.get("/show/:id", CoursesController.show);

// Route to request all of information for a given course
// This route should only be accessible to the following users:
//   > Users who have paid for the course
//   > Educator who teaches the course
//   > Admin
// ADD IN AUTH MIDDLEWEAR TO CHECK THE ABOVE
router.get("/dashboard/:id", passport.authenticate("jwt", {session: false}), CoursesController.dashboard);

// Routes to create and update a course in the database
// These routes should only be accessible to the following users:
//   > Educator approved for the given topic (e.g. Machine Learning)
//   > Admin
// ADD IN AUTH MIDDLEWEAR TO CHECK THE ABOVE
router.post("/courses", passport.authenticate("jwt", {session: false}), CoursesController.create);
router.put("/courses/:id", passport.authenticate("jwt", {session: false}), CoursesController.update);

module.exports = router;