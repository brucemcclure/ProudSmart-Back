require("./connect");
require("dotenv").config(); //need access to .env
const CourseModel = require("./models/course_model"); //need access to the Course Model
const UserModel = require("./models/user_model"); //need access to the user Model
const faker = require("faker"); //need faker in order to generate data
const _ = require("lodash");

const interestTags = [
  "Internet of things",
  "Machine Learning",
  "Artificial Inteligence",
  "Cloud",
  "Dev Ops",
  "Infrastructure"
];
const materials = ["3 text books", "5 videos", "6 documents"];
const certified = [true, false];
const recommendedPrerequisites = [
  "fundamentals of programming",
  "CS50",
  "fundamentals of C#",
  "fundamentals of GoLang"
];
const keyConcepts = [
  ["Learning async JS", "Web APIs", "Node", "Express", "Mongo", "React"]
];

const qualifications = [
  "Three Year Bachelor Pass Degree",
  "Four Year Bachelor Pass Degree",
  "Four Year Bachelor Honours Degree",
  "One Year Bachelor Honours Degree",
  "Double Bachelor Degree",
  "Graduate Entry Bachelor Degree",
  "Graduate Certificate",
  "Graduate Diploma",
  "Masters by Coursework Degree",
  "Masters by Research Degree",
  "Doctoral Degrees by Thesis",
  "Higher Doctoral Degree",
  "Honorary Doctoral Degree",
  "Three Year Bachelor Pass Degree",
  "Four Year Bachelor Pass Degree",
  "Four Year Bachelor Honours Degree",
  "One Year Bachelor Honours Degree",
  "Double Bachelor Degree",
  "Graduate Entry Bachelor Degree",
  "Graduate Certificate",
  "Graduate Diploma",
  "Masters by Coursework Degree",
  "Masters by Research Degree",
  "Doctoral Degrees by Thesis",
  "Higher Doctoral Degree",
  "Honorary Doctoral Degree"
];

const courses = [];
for (let i = 0; i < 10; i++) {
  console.log(`Creating courses ${i + 1}`);
  const course = new CourseModel({
    title: faker.name.title(),
    description: faker.lorem.paragraph(),
    video: "",
    price: 123.45,
    teacher: "chicken",
    interestTags: _.sampleSize(interestTags, 3),
    materials: _.sampleSize(materials, 2),
    totalStudentsEnrolled: _.random([(lower = 50)], [(upper = 99)]),
    courseProfilePicture: "chicken",
    courseDuration: _.random([(lower = 50)], [(upper = 99)]),
    //certified: _.sampleSize(certified, 1),
    certified: "true",
    recommendedPrerequisites: _.sampleSize(recommendedPrerequisites, 2),
    keyConcepts: _.sampleSize(keyConcepts, 2),
    content: [""]
  });
  const saveCourse = async () => {
    try {
      await course.save();
    } catch {
      console.log("********ERROR***********");
    }
  };
  saveCourse();
}

const users = [];
for (let i = 0; i < 10; i++) {
  console.log(`Creating user ${i + 1}`);
  const user = new UserModel({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: "mrpickles", //this well need to be addressed
    profile_image: faker.image.avatar(),
    interestTags: _.sampleSize(interestTags, 2),
    userType: "user",
    purchasedCourses: faker.name.title(), //needs to be addressesd
    qualifications: _.sampleSize(qualifications, 3)
  });

  const saveUser = async () => {
    try {
      await user.save();
    } catch {
      console.log("********ERROR***********");
    }
  };
  saveUser();
}

// Promise.all(courses)
//   .then(courses => {
//     console.log(`Seeds file successful, created ${courses.length} courses`);
//   })
//   //   .then(users => {
//   //     console.log(`Seeds file successful, created ${users.length} users`);
//   //   })
//   .catch(err => console.log(`Seeds file had an error: ${err}`))
//   .finally(() => mongoose.disconnect());
