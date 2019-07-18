const UserModel = require("./../database/models/user_model");
const CourseModel = require("./../database/models/course_model");

// educatorApplications returns an array of user records representing the outstanding applications to be an educator
// An outstanding application is found by querying the database for user records where the following criteria is met:
//   > educatorStatus is "applied" 
async function educatorApplications(req, res) {
  try {
    const educatorApplications = UserModel.find(
      {educatorStatus: "applied"}
    )
    return res.json(educatorApplications);       
  } catch (err) {
    return res.send(err);
  }
};

// courseApplications returns an array of course records which have not been approved by the admin.
// An outstanding course application is found by querying the database for course records where the following criterai is met:
//   > approved is false (the admin has not approved the course)
async function courseApplications(req, res) {
  try {
    const courseApplications = CourseModel.find(
      {approved: false}
    )
    return res.json(courseApplications);       
  } catch (err) {
    return res.send(err);
  }
};

// approval enables the admin to approve either a course or an educator 
// approval expects two pieces of data in the body of the request:
//   > the type of document (i.e. user or course)
//   > the document to approve
// The approved document is returned in the response object
async function approve(req, res) {
  const {type, document} = req.body;
  if (type === "user") {
    document.educatorStatus = "approved"
  } else {
    document.approved = true
  }
  try {
    await document.save();
    return res.json(document);
  } catch (err) {
    return res.send(err)
  }
};

module.exports = {
  educatorApplications,
  courseApplications,
  approve
}