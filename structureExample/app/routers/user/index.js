const express = require("express");
const uRouter = express.Router();
const {updateControllers} = require("./lib/controllers");
const {auth} = require("./lib/middleware");

uRouter.put("/update",auth,updateControllers.update);

module.exports = {uRouter};
