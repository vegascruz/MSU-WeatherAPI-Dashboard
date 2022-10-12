var city = "Las Vegas";
var API_Key = "b9484f46952004ac40fe78867828c4ee";
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&units=imperial&appid=${API_Key}`;

fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data)

});


