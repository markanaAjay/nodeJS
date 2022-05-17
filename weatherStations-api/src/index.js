const { Console } = require("console")
const express = require("express")
const http = require("http")
const path = require("path")
const socketio = require("socket.io")
const findNearestLocation = require('map-nearest-location')


const locations = [
  {//Shapar
    lat: 22.150078,
    lng: 70.791918
  },
  {//gondal
    lat: 21.961069,
    lng: 70.791880
  },
  {//junagadh
    lat: 21.519900,
    lng: 70.442946
  },
  {//padadhri
    lat: 22.430452,
    lng: 70.602457
  }
];

const app = express()
const server = http.createServer(app)
const io  = socketio(server) 

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,"../public")

app.use(express.static(publicDirectoryPath))



io.on("connection",(socket)=>{
  console.log("new connection is established")


  socket.on("disconnect",() => {
    console.log("user is disconnected")
  })

  socket.on("sendLocationData", (data) => {
    lat = data.latitude
    long = data.longitude
  
    const myLocation = {
      lat: lat,
      lng: long
    };

    const nearestLocation = findNearestLocation(myLocation, locations);

    console.log(nearestLocation);
  })

})


server.listen(port ,() =>{
  console.log(`server is running on port ${port}`)
}) 