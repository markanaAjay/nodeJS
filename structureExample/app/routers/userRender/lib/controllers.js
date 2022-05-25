const express = require("express");


const oControllers={}

oControllers.register=(req,res)=>{
	return res.render("auth/signup");
}
oControllers.login=(req,res)=>{
	return res.render("auth/signin");
}

oControllers.update = (req,res) =>{
	return res.render("user/update");
}

oControllers.admin = (req,res) =>{
	return res.render("auth/signin");
}

oControllers.adminData = (req,res) =>{
	return res.render("admin/userData");
}

module.exports = {oControllers};