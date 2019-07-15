const mongoose = require("mongoose");
const CourseSchema = require("./../schemas/course_schema");

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel;