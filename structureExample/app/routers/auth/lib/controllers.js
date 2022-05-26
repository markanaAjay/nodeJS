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
                 	console.log("oResult : ",result);
                        return res.status(200).json({
                            message:"You are registered",
                            data:oUser
                        })
                        //return res.reply(messages.successfully("You are Register"),oUser)

                 })
                }
             else {
                return res.status(400).json({
                    message:"Passsword is not matching"
                })
                //return res.reply(messages.not_found("Password is not matching"))
            }

       }
     })
}

userControllers.signIn = async (req, res) => {

    var oResult = await User.find({ sEmail: req.body.email })
    console.log("oResult : ",oResult[0].uType);
    if (oResult.length < 1) {
        return res.status(401).json({
            msg: "user not exist"
        })
    }
    bcrypt.compare(req.body.password, oResult[0].sPassword,async (err, result) => {
        if (!result) {
            return res.status(401).json({
                msg: "password matching is fail"
            })
        }

        if (result) {
            const sToken =await jwt.sign({
                email: oResult[0].sEmail
            }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            })
            console.log(sToken);

            req.session["token"] = sToken;
            req.session["email"] = req.body.email;
            req.session["uType"] = oResult[0].uType;
            console.log(req.session);

            let oDecoded = await jwt.verify(sToken, process.env.JWT_SECRET);
            console.log("oDecoded : ",oDecoded);

            return res.status(200).json({
                message:"You are loggedin",
                token:sToken,
                uType:oResult[0].uType                
            })
            //return res.reply(messages.successfully("You are loggedin"),sToken)

        }
    })
   

};

userControllers.logOut = async(req,res) => {
    req.session.destroy();

    return res.status(200).json({
        message:"You are logged out"
    })
    //return res.reply(messages.successfully("You are loggedout"))


}

module.exports = {userControllers};
