const express = require("express");
const adRouter = express.Router();
//const Order = require("../models/index");
const {validator} = require("./lib/validators");
const {adminControllers} = require("./lib/controllers");
const middleware = require("./lib/middleware");
const {userControllers} = require("../auth/lib/controllers"); 


adRouter.get("/adminData",middleware,adminControllers.getData);
adRouter.get("/adminlogin",userControllers.signIn);

module.exports = {adRouter};
