var fs = require("fs");

var data = fs.readFileSync("text.txt")

console.log(data.toString());

console.log("Noe we are creating a new file");
fs.writeFileSync("ajay.txt",data);

console.log("End Here");