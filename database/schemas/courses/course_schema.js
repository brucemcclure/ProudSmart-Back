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
  educator: {
    type: String,
    required: true
  },
  educatorId: {
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
    default: false
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
  approvalStatus: {
    type: String,
    enum: ["applied", "approved", "denied"],
    default: "applied"

  }
});

module.exports = CourseSchema;
