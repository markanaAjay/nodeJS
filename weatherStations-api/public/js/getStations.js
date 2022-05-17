const socket = io()

document.querySelector("#getLocation").addEventListener("click",() =>{
    if(!navigator.geolocation){
        return alert("Your browser not support Geolocation Api")
    }
    
    navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude 
    

        document.querySelector("#latLog").innerHTML = latitude+ " , " + longitude;

        socket.emit("sendLocationData", {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude  
        })
    })
    
    
})

