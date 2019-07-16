const { Schema } = require("mongoose");

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
  materials: {
    type: Array,
    required: true
  },
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
  content: {
    type: Array,
    required: true
  }
});

module.exports = CourseSchema;
