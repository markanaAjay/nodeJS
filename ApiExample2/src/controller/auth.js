const express = require("express");
const userData = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt = require("jsonwebtoken");
const session = require('express-session');

const userController = {};

userController.signUp = async (req, res) => {
    console.log(req.body);
        
     bcrypt.hash(req.body.password, 8, (err, hash) => {
         if (err) {
             return res.status(500).send("Error");
         }
         else {
            const user = new userData({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                confirmPassword: hash
             })
             if (req.body.password == req.body.confirmPassword) {
                 const result = user.save().then((result, err) => {
                 	console.log(result);
                     return res.status(200).render("signin");
                 })
             }
             else {
                 return res.status(401).send("password is not matching")
             }

       }
     })
}

userController.signIn = async (req, res) => {
    var result = await userData.find({ email: req.body.email })
    console.log("result : ",result)
    if (result.length < 1) {
        return res.status(401).json({
            msg: "user not exist"
        })
    }
    bcrypt.compare(req.body.password, result[0].password,async (err, result2) => {
        if (!result2) {
            return res.status(401).json({
                msg: "password matching is fail"
            })
        }

        if (result2) {
            const token =await jwt.sign({
                email: result[0].email
            }, 'avm', {
                expiresIn: "24h"
            })
            console.log(token);

            req.session.token = token;
            //console.log(req.session);
            let decoded = jwt.verify(token, "avm");
            console.log("Decode From Controller : ",decoded);

            return res.status(201).send(token)
        }
    })

};

userController.validateEmail = async(req,res) =>{
    try{
        
        console.log("emails : ",req.body.email);
        let data =await  userData.findOne({email:req.body.email});
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

module.exports = {userController};
