const { Schema } = require("mongoose");

const TopicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  videoUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = TopicSchema;