const express = require("express");
const {User} = require("../../../models/");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt = require("jsonwebtoken");

const adminControllers = {}

adminControllers.getData = async(req,res)=>{
	console.log("Hello From Admin controller");
	try{

		const data = await User.aggregate([{
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
        console.log(data);
		const response = {
			data :data,
			recordsFiltered: data.length,
        	recordsTotal: data.length
		}
				
		return res.status(200).send(response);
	}
	catch(error) {
		return res.status(400).send(error);
	}
    
}

module.exports = {adminControllers};