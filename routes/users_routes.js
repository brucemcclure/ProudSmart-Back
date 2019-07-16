const express = require("express");
const router = express.Router();
const UsersController = require("./../controllers/users_controller");
const {checkRole} = require("./../middleware/auth_middleware");

// users index route
// checkRole prevents all but admin from accessing the data for the users index
router.get("/", function(req, res, next) {
  console.log(req.user);
  checkRole(req, res, next, ["admin"]);
}, UsersController.index);

// Implement the dashboard route after the course routes and controller is able to serve up requests
router.get("/dashboard", UsersController.dashboard);

router.get("/edit-account-info", UsersController.editAccountInfo);



module.exports = router;