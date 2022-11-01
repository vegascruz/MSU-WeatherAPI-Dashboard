var city = "Las Vegas";
var API_Key = "b9484f46952004ac40fe78867828c4ee";
var count = 5;
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_Key}`;

var url_two = `https://api.openweathermap.org/data/2.5/onecall?lat=36.114647&lon=-115.172813&appid=${API_Key}`;

let todaysDay = moment().format("M/D/YYYY");
var h1 = $("#current").children("h1").text();
console.log(h1);

for(i=0;i<5;i++){

    console.log(i);
}

function fetchData(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
    /*for(i=0; i<5; i++){
        console.log(data.list[i].main.temp);
    }*/
    });
}

fetchData();



