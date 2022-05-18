const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	sName: {
        type: String,
        required: true
    },
    sEmail: {
        type: String,
        require: true
    },
    sPassword: {
        type:String ,
        require:true   
    },
    uType:{
        type:String,
        enum:["user","admin"],
        default:"user",
        require:true
    }
})

const User = mongoose.model("User",userSchema);

module.exports = {User};