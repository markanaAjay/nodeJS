const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const frontAuth = async (req, res, next) => {
    try {
        //const token = req.headers["token"];
        //let token = req.header('Authorization').replace('Bearer ', '')
        let token = req.session.token;
        console.log(token);
        token = String(token)
        let decoded = jwt.verify(token, "avm");
        //const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        
        console.log("Decoded Token : ",decoded);
        next()
    } catch (e) {
        console.log(e);

        res.status(401).render("signin");
        //res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = {frontAuth};