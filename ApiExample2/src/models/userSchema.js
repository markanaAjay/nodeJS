const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type:String,
        require: true
    },
    confirmPassword:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model("User",userSchema);

