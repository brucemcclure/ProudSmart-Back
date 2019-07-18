// checkRole is a middleware function to authenticate requests made by different user types
// it returns an error if the type of user (appended on the request by the passport JWT strategy) is not that specified within the function
// it takes the usual middlewear arguments in addition to the roles which are permitted for a specific endpoint
function checkRole(req, res, next, permittedRoles) {
  if (permittedRoles.includes(req.user.userType)) {
    return next();
  }

  return next(new HTTPError(422, "Unauthorised"))
}

// checkCourseOwner restricts the ability to edit to coure information unless the user is either:
//   > Admin; or
//   > The educator of that course
// Note this function expects educatorId to come through as a form value
function checkCourseOwner(req, res, next) {
  const {educatorId} = req.body;
  const {user} = req.user;
  if (user.userType === "admin" || user.id === educatorId) {
    return next();
  }

  return next(new HTTPError(422, "Unauthorised"))
}


module.exports = {
  checkRole,
  checkCourseOwner
}