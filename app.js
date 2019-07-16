const express = require("express");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const passport = require("./config/passport");

app.use(cors());

// DELETE THE NEXT TWO LINES BEFORE SUBMISSION!!!!!!!!!!!!!!!!!
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("combined"));


app.use(passport.initialize());

app.use(require("./routes"));

app.use(express.static("public"));

app.use(require("./middleware/error_handler_middleware"));

module.exports = app;