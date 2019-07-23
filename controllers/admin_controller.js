const UserModel = require("./../database/models/user_model");
const CourseModel = require("./../database/models/course_model");

// educatorApplications returns an array of user records representing the outstanding applications to be an educator
// An outstanding application is found by querying the database for user records where the following criteria is met:
//   > educatorStatus is "applied" 
async function educatorApplications(req, res) {
  try {
    const educatorApplications = await UserModel.find(
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
    const courseApplications = await CourseModel.find(
      {approvalStatus: "applied"}
    )
    console.log(courseApplications);
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
  
  try {
    let record;
    if (type === "user") {
      document.educatorStatus = "approved";
      document.userType = "educator";
      record = await UserModel.findByIdAndUpdate(document._id, document);
    } else {
      document.approvalStatus = "approved"
      record = await CourseModel.findByIdAndUpdate(document._id, document);
    }
    return res.json(document);
  } catch (err) {
    console.log(err)
    return res.send(err)
  }
};

// deny enables the admin to deny either a course or an educator 
// deny expects two pieces of data in the body of the request:
//   > the type of document (i.e. user or course)
//   > the document to deny
// If the document is a course then the course 
async function deny(req, res) {
  const {type, document} = req.body;
  try {
    let record;
    if (type === "user") {
      document.educatorStatus = "denied";
      record = await UserModel.findByIdAndUpdate(document._id, document);
    } else {
      document.approvalStatus = "denied";
      record = await CourseModel.findByIdAndUpdate(document._id, document);
    }
    return res.json(document);
  } catch (err) {
    console.log(err);
    return res.send(err)
  }
};


module.exports = {
  educatorApplications,
  courseApplications,
  approve,
  deny
}