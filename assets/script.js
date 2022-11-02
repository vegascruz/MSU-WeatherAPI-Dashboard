const API_Key = "b9484f46952004ac40fe78867828c4ee";

let dayOfMonth = parseInt(moment().format("DD"));
let todaysDay = moment().date(dayOfMonth).format("M/D/YYYY");

let h1 = $("#current").children("h1").text(todaysDay);

//-----------FUNCTIONS---------------
//this function 
$('.day').each(function(){
    dayOfMonth++;
    $(this).text(moment().date(dayOfMonth).format("M/D/YYYY"));

});

//this function will set the value of city and then run fetchData()
$("#searchBtn").on('click', function(){
    city = $(".inputValue").val();
    var $newListItem = $(`<input class="button" value="${city}" type="submit">`);
    $('#input').append($newListItem);
    wipeData();
    fetchData(API_Key, city);
});

//this function takes in two parameters to create the url which is then used
//to fetch data from openweathermap
function fetchData(API_Key, city){
    let i = 0;
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_Key}`;

    fetch(url)
    .then(handleErrors)
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

function wipeData(){
    $(".temp").each(function(){
        $(this).text('Temp:');
    });

    $(".wind").each(function(){
        $(this).text('Wind:');
    });

    $(".humidity").each(function(){
        $(this).text('Humidity:');
    });
}

function handleErrors(response) {
    if (!response.ok) {
        alert("Couldn't find");
        throw Error(response.statusText);
    }
    return response;
}




