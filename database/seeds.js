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

const courseTitles = [
  "intro",
  "maths",
  "stats",
  "algebra",
  "grammar"
]

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

const generateTopics = () => {
  let topics = [];
  for (let i = 0; i < 100; i++) {
    console.log(`Creating topics ${i + 1}`);
    topics.push(
      {
        title: faker.random.word(),
        description: faker.lorem.sentence(),
        videoUrl: faker.internet.url()
      }
    )
  }
  return topics;
}

const generateChapters = (generateTopics) => {
  let topics = generateTopics();
  let chapters = [];
  for (let i = 0; i < 100; i++) {
    console.log(`Creating chapters ${i + 1}`);
    chapters.push(
      {
        title: faker.random.word(),
        description: faker.lorem.sentence(),
        topics: _.sampleSize(topics, 5)
      }
    )
  }
  return chapters;
};

const chapters = generateChapters(generateTopics);

const generateCourses = async () => {
  let courses = [];
  for (let i = 0; i < 10; i++) {
    console.log(`Creating courses ${i + 1}`);
    const course = new CourseModel({
      title: _.sampleSize(courseTitles, 1),
      description: faker.lorem.paragraph(),
      teacher: "chicken",
      interestTags: _.sampleSize(interestTags, 3),
      materialsUrl: _.sampleSize(materials, 2),
      courseProfilePictureUrl: "www.chicken.com",
      certified: "true",
      recommendedPrerequisites: _.sampleSize(recommendedPrerequisites, 2),
      keyConcepts: _.sampleSize(keyConcepts, 2),
      chapters: _.sampleSize(chapters, 5),
      price: _.random(100)
    });
    courses.push(course);
    // console.log(course.title, courses.length);
    const saveCourse = async () => {
      try {
        await course.save();
      } catch {
        console.log("********ERROR***********");
      }
    };
    saveCourse();
  }
  return courses;
}

const pickPurchasedCourses = async () => {
  let courses = await generateCourses();
  let purchasedCourses = [];
  for (i = 0; i < _.random(1,courses.length); i++) {
    let randNum = _.random(1, courses.length-1);
    // console.log(`courses length is ${courses.length}. RandNum is ${randNum}`);
    let randomCourse = courses[randNum]; 
    purchasedCourses.push({
      courseId: randomCourse.id,
      title: randomCourse.title,
      courseProfilePictureUrl: randomCourse.courseProfilePictureUrl,
      description: randomCourse.description
    })
  }
  return purchasedCourses;
}

const generateUsers = async () => {
  purchases = await pickPurchasedCourses();
  let users = [];
  for (let i = 0; i < 10; i++) {
    console.log(`Creating user ${i + 1}`);
    const user = new UserModel({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: "mrpickles", //this well need to be addressed
      profilePhotoUrl: faker.internet.url(),
      interestTags: _.sampleSize(interestTags, 2),
      purchasedCourses: _.sampleSize(purchases,3) //needs to be addressesd
    });
    // console.log(user.purchasedCourses)
    try {
      await user.save();
    } catch (err) {
      console.log(err);
    }
    users.push(user);
    
  };
  
  
  return users;
}

const users = generateUsers();

const educators = [];
for (let i = 0; i < 10; i++) {
  console.log(`Creating educator ${i + 1}`);
  const user = new UserModel({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: "mrpickles", //this well need to be addressed
    profilePhotoUrl: faker.internet.url(),
    interestTags: _.sampleSize(interestTags, 2),
    userType: "educator",
    //needs to be addressesd
    qualifications: _.sampleSize(qualifications, 3),
    aboutMe: faker.lorem.paragraph(),
    teachingTags: _.sampleSize(qualifications, 3)
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
