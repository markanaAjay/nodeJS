const express = require("express");
const router = express.Router();
const {frontAuth} = require("../middleware/frontMiddleware");

router.get("/register",(req,res) =>{
	res.render("index");
});

router.get("/login",(req,res) =>{
	res.render("signin");
})

router.get("/home",frontAuth,(req,res) =>{
	res.render("crud");
})

router.get('/getSessionInfos', function(req,res,next){
    console.log(req.session);
});

router.get("/datatable",(req,res) =>{
	res.render("home");
})

module.exports = router;

