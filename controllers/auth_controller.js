const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

async function register (req, res) {
  let { email, password } = req.body;
  try {
    const user = await UserModel.create({ email, password })
    const token = JWTService.generateToken(user);
    
    return res.json({token});
  } catch (err) {
    return res.send(err);
  }
}

function login(req, res, next) {
    const {user} = req;
    const token = JWTService.generateToken(user);
    return res.json(token);
}

module.exports = {
    register,
    login,
    logout
}