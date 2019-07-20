const express = require("express");
const router = express.Router();
const AdminController = require("./../controllers/admin_controller");

// route for the admin to request all of the educator applications
router.get(
  "/educator-applications", 
  AdminController.educatorApplications
);

// route for the admin to request all of the course applications
router.get(
  "/course-applications", 
  AdminController.courseApplications
);

// route to approve application
router.post(
  "/approve-application", 
  AdminController.approve
);

// route to deny application
router.post(
  "/deny-application", 
  AdminController.deny
);

module.exports = router;