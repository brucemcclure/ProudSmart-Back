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
  materials: {
    type: Array,
    required: true
  },
  courseProfilePicture: {
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
  chapters: [ChapterSchema]
});

module.exports = CourseSchema;