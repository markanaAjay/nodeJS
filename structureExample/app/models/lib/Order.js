const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	OrderId :{
		type:String,
		required:true
	},
	OrderAmount:{
		type:Number,
		required:true
	},
	Name:{
		type:String,
		required:true
	},
	Address :{
		type:String,
		required:true
	},
	City:{
		type:String,
		required:true
	},
	State:{
		type:String,
		required:true
	},
	ZipCode:{
		type:Number,
		required:true
	},
	PhoneNumber:{
		type:Number,
		required:true,
		minlength:10
	},
	Email:{
		type:String,
		required:true
	},
	TrackingNumber:{
		type:String,
		required:true
	}
})

const Order = new mongoose.model('Order',orderSchema);

module.exports = {Order};
