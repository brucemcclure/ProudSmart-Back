const mongoose = require("mongoose");
require("dotenv").config(); //need access to .env
console.log(process.env.DB_HOST);
mongoose
  .connect(process.env.DB_HOST, { useNewUrlParser: true })
  .then(() => console.log("We are connected"))
  .catch(error => console.log(error));
mongoose.Promise = global.Promise;
mongoose.connection.on("error", error => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(error);
});

module.exports = mongoose;
