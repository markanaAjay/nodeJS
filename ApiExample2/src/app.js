const express = require("express");
const app = express();
const route = require("./routes/routes");
const ui = require("./routes/frontEndRoute");
const session = require('express-session');
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const {conn} = require("./db/conn");
conn();

app.use(express.json())

app.use(session({
secret : 'avm',
resave : false,
saveUninitialized : false,
 cookie: {
 
            //1 min 
            expires: 3600000
        }
}));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use("/productOrder",route);
app.use("/forms",ui);

app.listen(port,() => {

	console.log("server is running");
});
