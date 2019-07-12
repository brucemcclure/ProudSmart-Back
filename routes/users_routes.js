const express = require("express");
const router = express.Router();
const UsersController = require("./../controllers/users_controller");
const {checkRole} = require("./../middleware/auth_middleware")


router.get("/users", function(req, res, next) {
  checkRole(req, res, next, ["admin"])
}, UsersController.index);
router.get("/dashboard", UsersController.dashboard);
router.get("/edit-account-info", UsersController.editAccountInfo);



module.exports = router;