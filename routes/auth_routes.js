const express = require("express");
const router = express.Router();
const AuthController = require("./../controllers/auth_controller");
const passport = require("passport");

router.post("/login",(req,res,next) => {
  console.log(req.body);
  return next()
}, passport.authenticate('local', {
  session: false
}), AuthController.login);

router.post("/register", AuthController.register);

// Educator application not yet done
router.post("/educator-application", AuthController.educatorApplication);


module.exports = router;