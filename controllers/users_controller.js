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
//   > usertype = "educator"
// This should return both approved educators and those users who have applied to be an educator
async function educatorIndex (req, res) {
  try {
    const educators = await UserModel.find({
      $or: [
        {educatorStatus: "applied"},
        {educatorStatus: "approved"}
      ] 
    });

    console.log(educators);
    return res.json(educators);
  } catch (err) {
    return res.send(err);
  }
};

// educatorShow returns a response object containing all the information necessary to display a given educator's profile 
async function educatorShow (req, res, next) {
  const id = req.params.id;
  try {
    const educator = UserModel.findById(id, {
      firstName: 1,
      lastName: 1,
      profilePhotoUrl: 1,
      aboutMe: 1,
      qualifications: 1,
      educatorStatus: 1
    });

    // educator should be returned if their status has been set to approved by the admin
    if (educator.educatorStatus !== "approved") {
      return next(new HTTPError(422, "educator has not been approved"));
    }

    return res.json(educator);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  index,
  dashboard,
  accountInfo,
  educatorIndex,
  educatorShow
};