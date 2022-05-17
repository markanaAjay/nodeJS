const userController = {};
const userData = require("../models/model");
const bcrypt = require('bcrypt');
const { json } = require("express");
const jwt = require("jsonwebtoken")
userController.signUp = async (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
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
                    res.send(result)
                })
            }
            else {
                res.send("password is not matching")
            }

        }
    })
};

userController.signIn = async (req, res) => {
    var result = await userData.find({ name: req.body.name })
    if (result.length < 1) {
        return res.status(401).json({
            msg: "user not exist"
        })
    }
    bcrypt.compare(req.body.password, result[0].password, (err, result2) => {
        if (!result2) {
            return res.status(401).json({
                msg: "password matching is fail"
            })
        }

        if (result2) {
            const token = jwt.sign({
                name: result[0].name,
                password: result[0].password
            }, 'hello', {
                expiresIn: "24h"
            })
            res.status(200).json({
                name: result[0].name,
                token: token

            })
        }
    })

};
module.exports = { userController };