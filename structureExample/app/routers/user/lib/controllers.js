const express = require("express");
const {User} = require("../../../models/");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const session = require('express-session');

const updateControllers = {};

updateControllers.update = async(req,res) =>{
	try{

        console.log(req.body);
       
        const data =await  User.findOneAndUpdate({"email": req.body.email}, {$set:{"name":req.body.name}});
        console.log("data : ",data);

        if(!data){
        	console.log(data);
        	return res.status(404).send("Error");
        }
        else{
        	return res.status(200).send("Data Updated Successfully.");
        }

   	}
	catch(error) {
        console.log(error);
		return res.status(500).send(error);
	}
}

module.exports = {updateControllers};