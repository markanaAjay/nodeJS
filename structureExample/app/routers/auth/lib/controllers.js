const express = require("express");
const {User} = require("../../../models/");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt = require("jsonwebtoken");
const session = require('express-session');
require("dotenv").config();

const userControllers = {};

userControllers.signUp = async (req, res) => {

    console.log("body : ",req.body);
        
     bcrypt.hash(req.body.password, 8, async (err, hash) => {
         if (err) {
             return res.status(500).send("Error");
         }
         else {
            const oUser = new User({
                sName: req.body.name,
                sEmail: req.body.email,
                sPassword: hash,
                uType:"user"
                
            })
            console.log("oUser : ",oUser);
             if (req.body.password == req.body.confirmPassword) {
                await oUser.save().then((result, err) => {
                 	console.log("result : ",result);
                     return res.status(200).json({
                        message:"you are registered"
                     });
                 })
                }
             else {
                 return res.status(401).send("password is not matching")
             }

       }
     })
}

userControllers.signIn = async (req, res) => {

    var result = await User.find({ sEmail: req.body.email })
    console.log("result : ",result[0].uType);
    if (result.length < 1) {
        return res.status(401).json({
            msg: "user not exist"
        })
    }
    bcrypt.compare(req.body.password, result[0].sPassword,async (err, result2) => {
        if (!result2) {
            return res.status(401).json({
                msg: "password matching is fail"
            })
        }

        if (result2) {
            const token =await jwt.sign({
                email: result[0].email
            }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            })
            console.log(token);

            req.session["token"] = token;
            req.session["email"] = req.body.email;
            req.session["uType"] = result[0].uType;
            console.log(req.session);
           
            return res.status(200).send({
                message:"You are authenticated",
                token:token,
                uType:req.session.uType
            })
        }
    })
   

};

userControllers.logOut = async(req,res) => {
    req.session.destroy();

    return res.status(200).json({
        message:"You are loggedOut"
    })

}

module.exports = {userControllers};
