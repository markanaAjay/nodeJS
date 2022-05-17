const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:[true,"Email is already Present"],
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error("Invalid Email");
			}
		}
	},
	phone:{
		type:Number,
		min:10,
		required:true,
		unique:true
	},
	imagePath:{
		type : String,
		required:true,
		unique : true
	}

})

const User = new mongoose.model('test',userSchema);

module.exports = User;
