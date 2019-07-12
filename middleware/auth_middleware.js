// checkRole is a middlewear function to authenticate different user types
// it takes the usual middlewear arguments in addition to the roles which are permitted for a specific endpoint
function checkRole(req, res, next, permittedRoles) {
  const {user} = req;
  if (permittedRoles.includes(user.userType)) {
    return next();
  }

  return next(new HttpError(422, "Unauthorised"))
}

module.exports = {
  checkRole
}