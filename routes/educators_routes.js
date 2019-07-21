const express = require("express");
const router = express.Router();
const UsersController = require("./../controllers/users_controller");
const passport = require("passport");

// route to request all of the educators and educator applications in the database
// only admin has access to this data
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    checkRole(req, res, next, ["admin"]);
  },
  UsersController.educatorIndex
);


// route to request the profile information for an educator
router.get(
  "/:id",
  UsersController.educatorShow
)


module.exports = router;