const express = require("express");
const app = express();
const session = require('express-session');
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const {MongoDB} = require("./app/utils/");
const Connection = require("./app/routers/");

MongoDB.initialize();

Connection.initialize();



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