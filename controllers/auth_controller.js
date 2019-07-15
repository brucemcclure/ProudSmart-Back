const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

async function register (req, res) {
  
  let { email, firstName, lastName, password, interestTags } = req.body;
  
  
  // The following line should be deleted once AWS is setup
  // This is just to test the register form in the front end application
  let profilePhoto = req.body.photo.file.uid;
  
  try {
    const user = await UserModel.create({ email, firstName, lastName, password, profilePhoto, interestTags })
    const token = JWTService.generateToken(user);
    
    return res.json({token});
  } catch (err) {
    return res.send(err);
  }
}

async function educatorApplication (req, res) {
  // let { email, password } = req.body;
  // try {
  //   const user = await UserModel.create({ email, password })
  //   const token = JWTService.generateToken(user);
    
  //   return res.json({token});
  // } catch (err) {
  //   return res.send(err);
  // }
}

function login(req, res, next) {
  const {user} = req;
  const token = JWTService.generateToken(user);
  return res.json(token);
}

module.exports = {
  register,
  educatorApplication,
  login
}