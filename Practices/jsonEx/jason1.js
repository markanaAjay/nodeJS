const fs = require("fs");

/*const book = {
    title:"wil u be my ...",
    author:"unknown"
}

const bookJson = JSON.stringify(book);
fs.writeFileSync("jason1.json",bookJson);

const dataBuffer = fs.readFileSync("jason1.json")
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);
console.log(data.title);

*/

const dataBuffer = fs.readFileSync("jason1.json");
const dataJson = dataBuffer.toString();
const user = JSON.parse(dataJson);

user.name = "vivek";
user.age = 100;

const userjson = JSON.stringify(user);
fs.writeFileSync("jason1.json",userjson);



