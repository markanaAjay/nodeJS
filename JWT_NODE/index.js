const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express();
app.use(express.json())
const port = 3000;
app.use(express.static("view"));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
const myrouter = require("./router/route");
mongoose.connect('mongodb://localhost:27017/UserRegister',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("connection successfull")
}).catch((err) => {
    console.log(err)
})
app.use("/data", myrouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});