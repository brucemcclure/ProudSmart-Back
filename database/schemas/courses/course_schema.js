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
  teacherId: {
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
  courseProfilePictureUrl: {
    type: String,
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
  price: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean
  }
});

module.exports = CourseSchema;
