// checkRole is a middleware function to authenticate requests made by different user types
// it returns an error if the type of user (appended on the request by the passport JWT strategy) is not that specified within the function
// it takes the usual middlewear arguments in addition to the roles which are permitted for a specific endpoint
function checkRole(req, res, next, permittedRoles) {
  if (permittedRoles.includes(req.user.userType)) {
    return next();
  }

  return next(new HTTPError(422, "Unauthorised"))
}

module.exports = {
  checkRole
}