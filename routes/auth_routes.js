const express = require("express");
const router = express.Router();
const AuthController = require("./../controllers/auth_controller");
const passport = require("passport");

router.post(
  "/login", 
  passport.authenticate('local', {
    session: false
  }), 
  AuthController.login
);

router.post(
  "/register", 
  AuthController.register
);

// route to enable a user to apply to be a educator
// Note this is a put request because it is updating the educator fields of the User's document
router.put(
  "/educator-application",
  passport.authenticate("jwt", {session: false}),
  AuthController.educatorApplication
);

// route to enable a user to update their account information
router.put(
  "/update",
  passport.authenticate("jwt", {session: false}),
  AuthController.update
)


module.exports = router;