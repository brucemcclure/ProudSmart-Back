const CourseModel = require("./../database/models/course_model");

// index returns a response with basic information (e.g. title and description) of each course in the database
async function index(req, res) {
  const courses = await CourseModel.find(
    {
      approvalStatus: "approved"
    },
    {
      title: 1,
      description: 1,
      educator: 1,
      interestTags: 1,
      courseProfilePictureUrl: 1,
      certified: 1,
      recommendedPrerequisites: 1,
      keyConcepts: 1,
      "chapters.title": 1,
      "chapters.description": 1,
      "chapters.topics.title": 1,
      "chapters.topics.description": 1,
      price: 1
    }
  );
  return res.json(courses);
}

// show returns a response with information for the user to preview a course
async function show(req, res, next) {
  try {
    const course = await CourseModel.findById(req.params.id, {
      title: 1,
      description: 1,
      educator: 1,
      interestTags: 1,
      courseProfilePictureUrl: 1,
      certified: 1,
      recommendedPrerequisites: 1,
      keyConcepts: 1,
      "chapters.title": 1,
      "chapters.description": 1,
      "chapters.topics.title": 1,
      "chapters.topics.description": 1,
      price: 1
    });

    // restrict access to only courses which have been approved
    if (course.approvalStatus !== "approved") {
      return next(new HTTPError(422, "This course has not been approved"))
    };

    return res.json(course);
  } catch (err) {
    return res.send(err);
  }
}

// dashboard returns a response object containing all the information for a given course
async function dashboard(req, res, next) {
  const { user } = req;
  try {
    let course = await CourseModel.findById(req.params.id);

    // restrict access to only courses which have been approved
    if (course.approvalStatus !== "approved") {
      return next(new HTTPError(422, "This course has not been approved"))
    };

    // if the user is an admin or the educator of the course then return the data
    if (user.userType === "admin" || user.id === course.educatorId) {
      return res.json(course);
    }
    // else if the user has the course in their purchasedCourses then return the data
    for (let purchasedCourse of user.purchasedCourses) {
      if (purchasedCourse.courseId === req.params.id) {
        return res.json(course);
      }
    }

    // deny user access to the course
    return next(new HTTPError(422, "Unauthorised"));
  } catch (err) {
    return next(err);
  }
}

// create a new course in the database
async function create(req, res) {
  const {
    title,
    description,
    educator = req.user.firstName,
    educatorId = req.user.id,
    interestTags,
    materialsUrl,
    courseProfilePictureUrl,
    certified,
    recommendedPrerequisites,
    keyConcepts,
    chapters,
    price
  } = req.body;
  try {
    const course = await CourseModel.create({
      title,
      description,
      educator,
      educatorId,
      interestTags,
      materialsUrl,
      courseProfilePictureUrl,
      certified,
      recommendedPrerequisites,
      keyConcepts,
      chapters,
      price
    });
    return res.json(course);
  } catch (err) {
    return res.send(err);
  }
}

// update a course in the database
// MAKE SURE THERE IS EDUCATOR AND EDUCATORID FIELDS COND RENDERED FOR ADMIN 
async function update(req, res) {
  const {
    title,
    description,
    educator = req.user.firstName,
    educatorId = req.user.id,
    interestTags,
    materialsUrl,
    courseProfilePictureUrl,
    certified,
    recommendedPrerequisites,
    keyConcepts,
    chapters,
    price
  } = req.body;
  try {
    course = await CourseModel.findByIdAndUpdate(req.params.id, {
      title,
      description,
      teacher,
      interestTags,
      materialsUrl,
      courseProfilePictureUrl,
      certified,
      recommendedPrerequisites,
      keyConcepts,
      chapters,
      price
    });
    await course.save();
    return res.json(course);
  } catch (err) {
    return res.send(err);
  }
}

// delete a course in the database
async function destroy(req, res) {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    await course.save();
    return res.json(course);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
}

module.exports = {
  index,
  show,
  dashboard,
  create,
  update,
  destroy
};
