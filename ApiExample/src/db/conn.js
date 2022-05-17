const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ajay:ajay@cluster0.epbl6.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser:true,

}).then(() =>{
	console.log("connection is Established!");
}).catch((e) =>{

	console.log(e);
})
