const express = require("express");
const {User} = require("../../../models/");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const session = require('express-session');

const updateControllers = {};

updateControllers.update = async(req,res) =>{
	try{

        console.log("body : ",req.body);
       
        const oData =await  User.findOneAndUpdate({"sEmail": req.body.sEmail}, {$set:{"sName":req.body.sName}});
        console.log("data : ",oData);

        if(!oData){
        	console.log(oData);
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