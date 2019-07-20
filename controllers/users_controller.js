const UserModel = require("./../database/models/user_model");

// index returns all the users in the database
// this data is used in the users index page
async function index (req, res) {
  let users = await UserModel.find();
  console.log(users);
  return res.json(users);
};

// dashboard returns data for the current user's dashboard page
// two variables are returned
//   > All the user document; and
//   > The courses recommeneded to the user
async function dashboard (req, res) {
  // STILL TO IMPLEMENT RECOMMENDED COURSES
  return res.send(req.user);
};

// accountInfo returns data for the user's edit account information page
// the data is used to autocomplete the form with the user's current account information
// note the route to update the user's information in the database is in the auth routes (edit)
function accountInfo (req, res) {
  return res.json(req.user);
};

// educatorsIndex returns a response object with all of the user documents matching the following query paramaters:
//   > usertype = educator
// This should return both approved educators and those users who have applied to be an educator
async function educatorIndex (req, res) {
  try {
    const educators = UserModel.find({
      $or: [
        {educatorStatus: "applied"},
        {educatorStatus: "approved"}
      ] 
    });
    return res.json(educators);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  index,
  dashboard,
  accountInfo,
  educatorIndex
};