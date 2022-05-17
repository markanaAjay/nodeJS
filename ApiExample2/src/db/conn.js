const mongoose = require("mongoose");


const conn = async () => {
	try{
		await mongoose.connect("mongodb+srv://ajay:ajay@cluster0.epbl6.mongodb.net/auth?retryWrites=true&w=majority",{
			useNewUrlParser: true,
  			useUnifiedTopology: true,
		})
		console.log("Connection is established")
	}
	catch(e){
			console.log(e);


	}
}


module.exports = {conn};
/*mongoose.connect("mongodb+srv://ajay:ajay@cluster0.epbl6.mongodb.net/auth?retryWrites=true&w=majority",{
	useNewUrlParser:true,

}).then(() =>{
	console.log("connection is Established!");
}).catch((e) =>{

	console.log(e);
})*/
