const jwt = require('jsonwebtoken');
const {User} = require('../../../models/');

const auth = async (req, res, next) => {
    try {
        //const token = req.headers["token"];
        let sToken = req.header('Authorization');
        //let token = req.session.token;
        console.log(sToken);
        sToken = String(sToken)
        let oDecoded = jwt.verify(sToken, process.env.JWT_SECRET);
        const oUser = await User.findOne({ sEmail: oDecoded.email})

        //const users = await {email:verified.email};  
        /*if (!user) {
            throw new Error()
        }

         

        
        req.token = token
        req.user = user*/
        console.log(req.session);
        if(oDecoded.sEmail == req.session.email || req.session.uType == "user" || oUser.uType == "user"){
        console.log("user :   ",oUser);
        //console.log("users : ",users);
        console.log(oDecoded);
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