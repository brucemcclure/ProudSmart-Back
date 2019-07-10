const userSchema = new Schema({
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
    required: true
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
    type: enaum,
    required: true
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
