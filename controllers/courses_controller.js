const CourseModel = require("./../database/models/course_model");

// index returns a response with basic information (e.g. title and description) of each course in the database
async function index (req, res) {
  const courses = await CourseModel.find({}, {
    title: 1,
    description: 1,
    teacher: 1,
    interestTags: 1
  });
  return res.json(courses);
};

// show returns a response with information for the user to preview a course
async function show (req, res) {
  try {
    const course = await CourseModel.findById(req.params.id, {
      title: 1, 
      description: 1,
      teacher: 1, 
      interestTags: 1,
      courseProfilePictureUrl: 1,
      certified: 1,
      recommendedPrerequisites: 1,
      keyConcepts: 1,
      'chapters.title': 1,
      'chapters.description': 1,
      'chapters.topics.title': 1,
      'chapters.topics.description': 1
    });

    return res.json(course);

  } catch (err) {
    return res.send(err)
  }
};

// dashboard returns a response object containing all the information for a given course
async function dashboard (req, res) {
  let course = await CourseModel.findById(req.params.id);
  return res.json(course);
};

// create a new course in the database
async function create (req, res) {
  const {
    title, 
    description,
    teacher, 
    interestTags,
    materialsUrl,
    courseProfilePictureUrl,
    certified,
    recommendedPrerequisites,
    keyConcepts,
    chapters
   } = req.body;
  try {
    const course = await CourseModel.create({
      title,
      description,
      teacher,
      interestTags,
      materialsUrl,
      courseProfilePictureUrl,
      certified,
      recommendedPrerequisites,
      keyConcepts,
      chapters
    });
    return res.json(course);
  } catch (err) {
    return res.send(err)
  }
};

// update a course in the database
async function update (req, res) {
  const {
    title, 
    description,
    teacher, 
    interestTags,
    materialsUrl,
    courseProfilePictureUrl,
    certified,
    recommendedPrerequisites,
    keyConcepts,
    chapters
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
      chapters
    });
    await course.save;
    return res.json(course);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = {
  index,
  show,
  dashboard,
  create,
  update
}