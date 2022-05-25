const express = require("express");
const rRouter = express.Router();
const {oControllers} = require("./lib/controllers");

rRouter.get("/register",oControllers.register);

rRouter.get("/login",oControllers.login);

rRouter.get("/update",oControllers.update);

rRouter.get("/admin",oControllers.admin);

rRouter.get("/admin/userData",oControllers.adminData);

module.exports = {rRouter};