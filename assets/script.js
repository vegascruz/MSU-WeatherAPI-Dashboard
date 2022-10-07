var city = "Las Vegas";
var API_Key = "b9484f46952004ac40fe78867828c4ee";
var lat = 0;
var lon = 0;

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_Key}`)
.then(response => response.json())
.then(data => {
    console.log(data)
    lat = data[0]['lat'];
    lon = data[0]['lon'];
    console.log("longitude: " + lon + "latitude: " + lat);
});


