const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
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
  timeStamp: {
    type: Date,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  interestTags: {
    type: Array,
    required: true
  },
  userType: {
    type: String,
    required: true,
    enum: ["freeUser", "paidUser", "educator", "admin"]
  },
  purchasedCourses: {
    type: Array,
    required: false
  },
  qualifications: {
    type: Array,
    required: false
  },
  aboutMe: {
    type: String,
    required: false
  },
  teachingTags: {
    type: Array,
    required: false
  }
});

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = UserSchema;