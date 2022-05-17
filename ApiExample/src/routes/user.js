const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
//const upload = require("../fileUpload/fileUpload");
const upload = multer({dest : "images/"});

router.get("/",(req,res) => {

	return res.send("Hello! Front End");
})

router.post("/",upload.single("imagePath"),async (req,res) => {
	
	const user = new User({
	name:req.body.name,
	email:req.body.email,
	phone:req.body.phone,
	imagePath:req.file.path
	});
	
	console.log(user);
	try{
		await user.save();
		return res.send(user);
	}
	 
	catch(e)
	{		
		return res.send(e.message);
	}
	
})

router.patch("/:id",async(req,res) =>{
	const obj = await User.findById(req.params.id);
	console.log(obj)
	try{
	obj.phone = req.body.phone;
	const render = await obj.save();
		return res.send(render);
	}
	catch(e){
		return res.send(e.message);
	}

})

router.get("/:id",async(req,res) =>{
	const obj = await User.findById(req.params.id);
	res.json(obj);

})

router.delete('/:id', async (req, res) => {
    	const obj = await User.findById(req.params.id);
    	try{
    		const removedUser = await obj.remove();
    		return res.json(removedUser);
    	}
    	catch(e){
    		return res.send(e.message);
    	}
})


module.exports = router;
