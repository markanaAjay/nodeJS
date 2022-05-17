const request = require("request");

const url = "http://api.weatherstack.com/current?access_key=17869b0f7fc9ee56cddbd655c2ccb576&query=Rajkot&units=f";

request({url:url,json:true}, (error,response)=>{
    if(error){
        console.log("unable to connect to weather service!");
    }
    else if(response.body.error){
        console.log("unable to find location");
    }
    else{
    console.log(`it is currently ${response.body.current.temperature} degree out. it feels like ${response.body.current.feelslike} degree out.`);
    }
})  
/*

const geocodeURl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWpheW1hcmthbmEiLCJhIjoiY2tta25yeWltMTJ0dzJ3bmFuODN2ZHhocSJ9.aG0kV6Z1BNL5qeIJ1VHiMQ&limit=1";

request({url:geocodeURl,json:true},(error,response)=>{
    if(error){
        console.log("unable to connect to ther service");
    }
    else if(response.body.features.length === 0){
        console.log("unable to find location");
    }
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(latitude,longitude);
})
/*
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}*/