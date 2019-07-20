const { Schema } = require("mongoose");
const PurchasedCoursesSchema = require("./purchased_courses_schema.js");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
  profilePhotoUrl: {
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
  educatorStatus: {
    type: String,
    enum: ["not", "applied", "approved", "denied"],
    default: "not"
  },
  purchasedCourses: [PurchasedCoursesSchema],
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