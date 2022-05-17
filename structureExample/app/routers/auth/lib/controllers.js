const express = require("express");
const {User} = require("../../../models/");
const bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt = require("jsonwebtoken");
const session = require('express-session');

const userControllers = {};

userControllers.signUp = async (req, res) => {
    console.log("body : ",req.body);
        
     bcrypt.hash(req.body.password, 8, (err, hash) => {
         if (err) {
             return res.status(500).send("Error");
         }
         else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                confirmPassword: hash
             })
             if (req.body.password == req.body.confirmPassword) {
                 const result = user.save().then((result, err) => {
                 	console.log(result);
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
    var result = await User.find({ email: req.body.email })
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

module.exports = {userControllers};
