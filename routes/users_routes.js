const express = require("express");
const router = express.Router();
const UsersController = require("./../controllers/users_controller");
const {checkRole} = require("./../middleware/auth_middleware");

// route to request all of the current users for the users index page
// checkRole is a custom authentication middle which prevents all but the admin user from accessing the data for the users index
router.get(
  "/", 
  function(req, res, next) {
    checkRole(req, res, next, ["admin"]);
  }, 
  UsersController.index
);

// Implement the dashboard route after the course routes and controller is able to serve up requests
router.get(
  "/dashboard", 
  UsersController.dashboard
);

//  route to request the user's current information 
router.get(
  "/account-info", 
  UsersController.accountInfo
);



module.exports = router;