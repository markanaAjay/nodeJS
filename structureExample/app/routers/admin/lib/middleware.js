const jwt = require('jsonwebtoken');
const {User} = require('../../../models/');
require('dotenv').config();


const auth = async (req, res, next) => {
    try {
        //let token = req.header('Authorization');
        let sToken = req.session.token;
        console.log("token.......... =>",sToken);
        sToken = String(sToken)


        let oDecoded = await jwt.verify(sToken, process.env.JWT_SECRET);
        console.log("oDecoded : ",oDecoded);
        const oUser = await User.findOne({ sEmail: oDecoded.email})
        console.log("oUser : ",oUser);

        console.log(req.session);
        if(oDecoded.sEmail == req.session.email || req.session.uType == "admin" || oUser.uType == "admin"){
        //console.log("user :   ",user);
        //console.log("users : ",users);
        console.log(oDecoded);
        next()
        }
        else{
            return res.status(400).json({
                message:"Session Expired"
            })
            //return res.reply(messages.unauthorized("Session Expired"))
        }
    } catch (e) {
        console.log(e);

        //return res.reply(messages.unauthorized("Session Expired"))
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;