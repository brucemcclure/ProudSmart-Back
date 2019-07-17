const { Schema } = require("mongoose");
const ChapterSchema = require("./chapter_schema.js");

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: true
  },
  interestTags: {
    type: Array,
    required: true
  },
  materialsUrl: {
    type: Array,
    required: true
  },
<<<<<<< HEAD:database/schemas/courses/course_schema.js
  courseProfilePictureUrl: {
    type: String,
=======
  totalStudentsEnrolled: {
    type: Number,
    required: true
  },
  courseProfilePicture: {
    type: String,
    required: true
  },
  courseDuration: {
    type: Number,
>>>>>>> e35b1aa033913c8cfa531a7b5c49360ac7249374:database/schemas/course_schema.js
    required: true
  },
  certified: {
    type: Boolean,
    required: true
  },
  recommendedPrerequisites: {
    type: Array,
    required: true
  },
  keyConcepts: {
    type: Array,
    required: true
  },
  chapters: [ChapterSchema],
  approved: {
    type: Boolean
  }
});

module.exports = CourseSchema;
