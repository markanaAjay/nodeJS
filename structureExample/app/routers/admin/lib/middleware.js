const jwt = require('jsonwebtoken');
const {User} = require('../../../models/');

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        //let token = req.session.token;
        console.log(token);
        token = String(token)


        let decoded = jwt.verify(token, "avm");
        const user = await User.findOne({ sEmail: decoded.email})

        if(decoded.sEmail == req.session.email || req.session.uType == "admin" || user.uType == "admin"){
        console.log("user :   ",user);
        //console.log("users : ",users);
        console.log(decoded);
        next()
        }
        else{
            res.status(400).json({
                message:"Unauthorized"
            })
        }
    } catch (e) {
        console.log(e);

        res.status(401).render("signin");
        //res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth;