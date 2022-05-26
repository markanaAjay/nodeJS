const express = require("express");
const {User} = require("../../../models/");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt = require("jsonwebtoken");

const adminControllers = {}

adminControllers.getData = async(req,res)=>{
	console.log("Hello From Admin controller");
	try{

		const oData = await User.aggregate([{
			$match: {
				uType: "user",
			},
		},
		{
			$project: {
				uType: 0,
				_id: 0,
				__v: 0,
				sPassword: 0,
			},
		},
	]);
        console.log(oData);
		const oResponse = {
			data :oData,
			recordsFiltered: oData.length,
        	recordsTotal: oData.length
		}
		return res.status(200).send(oResponse)	
		//return res.reply(messages.successfully("data found"),oResponse)
	}
	catch(error) {
		//return res.reply(messages.not_found("data"))
		return res.status(400).json({
			message:"Data Not Found"
		})

	}
    
}

adminControllers.delete = async (req,res) =>{
	try{

		console.log(req.body.Name);
       
        const data = await User.findOneAndDelete({sName: req.body.Name });
        console.log(data);

        if(!data){
        	console.log("data not found");
        	return res.status(404).send("Error");
        }
        else{
        	return res.status(200).send("Data Deleted Successfully");
        }
        
       	}
	catch(error) {
        console.log(error);
		res.status(500).send(error);
	}
}

module.exports = {adminControllers};