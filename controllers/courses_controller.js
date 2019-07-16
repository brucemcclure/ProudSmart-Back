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
  const {id} = req.body;
  const coursePreview = await CourseModel.findById(id, {
    
  });

};
async function dashboard () {};
async function create () {};
async function update () {};

module.exports = {
  index,
  show,
  dashboard,
  create,
  update
}