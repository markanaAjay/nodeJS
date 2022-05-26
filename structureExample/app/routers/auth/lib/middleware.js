const jwt = require('jsonwebtoken');
const {User} = require('../../../models/');
require("dotenv").config();

const auth = async (req, res, next) => {
    try {
        //const token = req.headers["token"];
        let sToken = req.header('Authorization');
        //let token = req.session.token;
        console.log(sToken);
        sToken = String(sToken)
        let decoded =await jwt.verify(sToken, process.env.JWT_SECRET);
        const oUser = await User.findOne({ sEmail: decoded.email})

        //const users = await {email:verified.email};  
        /*if (!user) {
            throw new Error()
        }

        
        req.token = token
        req.user = user*/
        console.log(req.session);
        if(decoded.sEmail == req.session.email || req.session.uType == "user" || oUser.uType == "user"){

        console.log("user :   ",oUser);
        //console.log("users : ",users);
        console.log(decoded);
        next()
        }
        else{
            return res.status(400).json({
                message:"Session Expired"
            });
            //return res.reply(messages.unauthorized("Session Expired"))

        }
    } catch (e) {
        console.log(e);

        //return res.reply(messages.unauthorized("Session Expired"))
        return res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = {auth};