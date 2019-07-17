const { Schema } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  profilePhoto: {
    type: String
  },
  interestTags: {
    type: Array,
    required: true
  },
  userType: {
    type: String,
    enum: ["user", "educator", "admin"],
    default: "user"
  },
  purchasedCourses: {
    type: Array
  },
  qualifications: {
    type: Array
  },
  aboutMe: {
    type: String
  },
  teachingTags: {
    type: Array
  }
},
{
  timestamps: true
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = UserSchema;