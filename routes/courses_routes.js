const express = require("express");
const router = express.Router();
const CoursesController = require("../controllers/courses_controller");
const {checkCourseOwner} = require("./../middleware/auth_middleware.js");
const passport = require("passport");

// Route to request a list of all the courses in the database
router.get(
  "/", 
  CoursesController.index
);

// Route to request all of the information required to enable a user preview a given course
router.get(
  "/show/:id", 
  CoursesController.show
);

// Route to request all of information for a given course
router.get(
  "/dashboard/:id", 
  passport.authenticate("jwt", {session: false}), 
  CoursesController.dashboard
);

// Routes to create, update and delete a course in the database
// These routes should only be accessible to the following users:
//   > Educator of the course (e.g. Machine Learning)
//   > Admin

router.post(
  "/", 
  passport.authenticate("jwt", {session: false}), 
  checkCourseOwner,
  CoursesController.create
);
router.put(
  "/:id", 
  passport.authenticate("jwt", {session: false}), 
  checkCourseOwner,
  CoursesController.update
);
router.delete(
  "/:id", 
  passport.authenticate("jwt", {session: false}), 
  checkCourseOwner,
  CoursesController.destroy
);

module.exports = router;