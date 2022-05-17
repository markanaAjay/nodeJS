const express = require("express");
const app = express();
const {aRouter} = require("./auth/");
const {uRouter} = require("./user/");
const router = express.Router();
const session = require('express-session');

router.use("/auth",aRouter);

router.use("/user",uRouter);

module.exports = {router};
