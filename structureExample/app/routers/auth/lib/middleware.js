const jwt = require('jsonwebtoken');
const {User} = require('../../../models/');

const auth = async (req, res, next) => {
    try {
        //const token = req.headers["token"];
        let token = req.header('Authorization');
        //let token = req.session.token;
        console.log(token);
        token = String(token)
        let decoded =await jwt.verify(token, "avm");
        const user = await User.findOne({ sEmail: decoded.email})

        //const users = await {email:verified.email};  
        /*if (!user) {
            throw new Error()
        }

        
        req.token = token
        req.user = user*/
        console.log(req.session);
        if(decoded.sEmail == req.session.email || req.session.uType == "user" || user.uType == "user"){

        console.log("user :   ",user);
        //console.log("users : ",users);
        console.log(decoded);
        next()
        }
        else{
            return res.status(400).json({
                message:"You are unauthorized or loggedout"
            })
        }
    } catch (e) {
        console.log(e);

        res.status(401).render("signin");
        //res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = {auth};