const express = require("express");
const adRouter = express.Router();
//const Order = require("../models/index");
const {validator} = require("./lib/validators");
const {adminControllers} = require("./lib/controllers");
const middleware = require("./lib/middleware");


adRouter.get("/adminData",middleware,adminControllers.getData);

module.exports = {adRouter};
