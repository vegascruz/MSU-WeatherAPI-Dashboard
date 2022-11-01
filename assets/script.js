var city = "Las Vegas";
var API_Key = "b9484f46952004ac40fe78867828c4ee";
var count = 5;
var url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_Key}`;

var url_two = `https://api.openweathermap.org/data/2.5/onecall?lat=36.114647&lon=-115.172813&appid=${API_Key}`;

let dayOfMonth = parseInt(moment().format("DD"));
let finalForecastDay = dayOfMonth + 5;
let todaysDay = moment().date(dayOfMonth).format("M/D/YYYY");

var h1 = $("#current").children("h1").text(todaysDay);


$('.day').each(function(){
    dayOfMonth++;
    $(this).text(moment().date(dayOfMonth).format("M/D/YYYY"));
});

let i = 0;
function fetchData(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
    //this loop sets the temp for each forecast date including today's date
        $(".temp").each(function(){
            i++;
            $(this).append(data.list[i].main.temp + " °F");
        });
    //this loop sets the wind for each forecast date including today's date
        $(".wind").each(function(){
            i++;
            $(this).append(data.list[i].wind.speed + " MPH");
        });
    //this loop sets the humidity for each forecast date including today's date
        $(".humidity").each(function(){
            i++;
            $(this).append(data.list[i].main.humidity + " %");
        });

    });
}

fetchData();



