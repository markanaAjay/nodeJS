const express = require("express");
const userData = require("../../../models");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const session = require('express-session');

const validator = {};

validator.validateEmail = async(req,res) =>{
    try{
        
        console.log("emails : ",req.body.email);
        let data =await  userData.findOne({sEmail:req.body.email});
        console.log("data : ",data);

        if(!data){
            return res.send(true);
        }
        else{
            return res.status(406).send(false);
        }
       
    }

    catch(error) {
        console.log(error);
        res.status(500).send(error);
    }

}

module.exports = {validator};
