const express = require("express");
const app = express();
const User = require("./models/users");
require("./db/conn");
const userr = require("./routes/user");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/users",userr);


app.listen(port,() => {

	console.log("server is running");
})

