const express = require("express");
const router = express.Router();
const Order = require("../models/schema");
const {controller} = require("../controller/controller");
const {userController} = require("../controller/auth");
const {auth} = require("../middleware/authMiddleware");


router.get("/",controller.get);

router.post("/",auth,controller.post);

router.put("/update",auth,controller.put);

router.delete("/delete",auth,controller.delete);

router.post("/search",controller.search);

router.delete("/deleteItem",controller.deleteItem);

router.put("/updateOrder/",controller.updateOrder);

router.post("/SignIn", userController.signIn);

router.post("/SignUp",userController.signUp);

router.post("/validateEmail",userController.validateEmail);


module.exports = router;
