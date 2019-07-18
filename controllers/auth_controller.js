const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");


// register enables a site visitor to sign up for a user's account
async function register (req, res) {
  
  let { 
    email, 
    firstName, 
    lastName, 
    password, 
    interestTags } = req.body;
  
  
  // The following line should be deleted once AWS is setup
  // This is just to test the register form in the front end application
  let profilePhotoUrl = req.body.photo.file.uid;
  
  try {
    const user = await UserModel.create({ 
      email, 
      firstName, 
      lastName, 
      password, 
      profilePhotoUrl, 
      interestTags });
      
    const token = JWTService.generateToken(user);
    
    return res.json(token);
  } catch (err) {
    return res.send(err);
  }
}

// educatorApplication enables a user to apply to be a teacher
// educatorApplication expects qualifications, aboutMe and teachingTags form data in the request object
async function educatorApplication (req, res) {
  const {user} = req;
  const {qualifications, aboutMe, teachingTags} = req.body;
  user.qualifications = qualifications;
  user.aboutMe = aboutMe;
  user.teachingTags = teachingTags;
  try {
    await user.save;
    return res.json(user);
  } catch (err) {
    return res.send(err);
  }
}

// login enables a user to login
// authentication occurs via a JWT passport strategy
function login(req, res, next) {  
  const {user} = req;
  const token = JWTService.generateToken(user);
  return res.json(token);
}

// need an edit function

module.exports = {
  register,
  educatorApplication,
  login
}