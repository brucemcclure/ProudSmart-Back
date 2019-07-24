const { Schema } = require("mongoose");
const TopicSchema = require("./topic_schema.js");

const ChapterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  topics: [TopicSchema]
}, {
  timestamps: true
});

module.exports = ChapterSchema;