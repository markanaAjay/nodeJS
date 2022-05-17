const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const {router} = require("./route")

const port = process.env.PORT || 8000;

function Connection(){

}

app.use(session({
    secret : 'avm',
    resave : false,
    saveUninitialized : false,
     cookie: {
     
                //1 min 
                expires: 3600000
            }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


Connection.prototype.initialize = function(){

    app.listen(port,() => {
    app.use("/api/v1", router);

	console.log("server is running");
});

}

module.exports = new Connection();


/*{
    "OrderId" : "TK15",
    "OrderAmount": 1000,
    "Name":"13 pro",
    "Address":"kado dungar",
    "City":"san diago",
    "State":"katch",
    "ZipCode":360003,
    "PhoneNumber":9386411019,
    "Email":"avmmj@gmail.com",
    "TrackingNumber":39987563
    
}*/