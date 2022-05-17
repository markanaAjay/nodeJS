const express = require("express");
const aRouter = express.Router();
//const Order = require("../models/index");
const {validator} = require("./lib/validators");
const {userControllers} = require("./lib/controllers");
//const {auth} = require("../lib/middleware");


aRouter.post("/SignIn", userControllers.signIn);

aRouter.post("/SignUp",userControllers.signUp);

aRouter.post("/validateEmail",validator.validateEmail);


module.exports = {aRouter};
