
//this is our API key we need to use to have access to weather data. It is used later to create our fetch url
const API_Key = "b9484f46952004ac40fe78867828c4ee";

//this returns to us the current day as day of the month, ex: May "1" or "9"
let dayOfMonth = parseInt(moment().format("DD"));
//this is just our current day in a readable format for forecast days
let todaysDay = moment().date(dayOfMonth).format("M/D/YYYY");

let h1 = $("#current").children("h1").text('');

if(localStorage.getItem('mostRecentSearch') === null){
    console.log('empty');
}else{
    let currentCity = localStorage.getItem('mostRecentSearch');
    currentCity = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
    
    h1.text(currentCity + " " + todaysDay);
}

//let icon = document.getElementById('icon');

let buttonsArray = [];

//this value is a boolean. Changes based on whether a good search is returned or not. Allows for us to add buttons based on whether they work
let safeSearch;
//this is another boolean that we will use to add a button based on if it's already a button or not. 
let isCurrentButton = false;


//-----------FUNCTIONS---------------
//this function 
$('.day').each(function(){
    dayOfMonth++;
    $(this).text(moment().date(dayOfMonth).format("M/D/YYYY"));

});

//this function will set the value of city and then run fetchData()
$("#searchBtn").on('click', function(){

    city = $(".inputValue").val();
    if(city != '')
    {
        isCurrentButton = false;
        $('.inputValue').val('');

        localStorage.setItem('mostRecentSearch', city);
        city = city.charAt(0).toUpperCase() + city.slice(1);
        h1.text(city + " " + todaysDay)
        wipeData();
        fetchData(API_Key, city); 
    }
});

//on load, reload the recentSearches container
$(window).on( "load", function() { 
    if(localStorage.getItem('mostRecentSearch') === null){
        console.log('empty');
    }else{
        let currentCity = localStorage.getItem('mostRecentSearch');
        currentCity = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
        h1.text(currentCity + " " + todaysDay)
        isCurrentButton = false;
        buttonsArray = [];
        loadRecentSearches();
        fetchDataOnLoad(API_Key, currentCity);
    }

});

//this function will search for weather data based on city clicked
function search(){
    isCurrentButton = true;
    wipeData();
    city = $(this).val();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    h1.text(city + " " + todaysDay)
    fetchData(API_Key, city);
}

//this function will save the recent search and store it within an array then add to the localstorage 
function saveRecentSearch(recentSearch){

    recentSearch = recentSearch.charAt(0).toUpperCase() + recentSearch.slice(1);

    safeSearch = true;
    buttonsArray = (JSON.parse(localStorage.getItem('recentSearches')));
    if(safeSearch == true){
        if(buttonsArray == null){
            buttonsArray = [];
            buttonsArray.push(recentSearch);
        }else{
            buttonsArray.unshift(recentSearch);
        }
        buttonsArray.splice(8);
        localStorage.setItem('recentSearches', JSON.stringify(buttonsArray));
    }
    loadRecentSearches();
}

//this function will load recent searches below the input box as buttons
function loadRecentSearches(){
    $('.searchHistory').empty();
    let citiesArray = JSON.parse(localStorage.getItem('recentSearches'));
    
    if(citiesArray != null){
        for(var city of citiesArray){
            var recentSearch = document.createElement('input');
            recentSearch.type = "submit";
            recentSearch.className = "button";
            recentSearch.id = "recentSearchButton"
            recentSearch.value = city;
            recentSearch.addEventListener('click', search);
            $('.searchHistory').append(recentSearch);
        }
    }

}
//this function takes in two parameters to create the url which is then used
//to fetch data from openweathermap
function fetchData(API_Key, city){
    let i = 0;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_Key}`;

    fetch(url)
    .then(handleErrors) //this will run first. NOthing else will run until we determine if there are no errors
    .then(response => response.json()) //json turns it into readable data
    .then(data => {
    //this loop sets the temp for each forecast date including today's date
        $(".temp").each(function(){
            i++;
            $(this).append(" " + data.list[i].main.temp + " °F");
        });
    //this loop sets the wind for each forecast date including today's date
        $(".wind").each(function(){
            i++;
            $(this).append(" " + data.list[i].wind.speed + " MPH");
        });
    //this loop sets the humidity for each forecast date including today's date
        $(".humidity").each(function(){
            i++;
            $(this).append(" " + data.list[i].main.humidity + " %");
        });

        $('i').each(function(){
            let desc = data.list[i].weather[0].description;
            if(desc.includes('clouds')){
                $(this).removeClass();
                $(this).addClass("fas fa-cloud");
                $(this).css("color", "gray");
            }else{
                $(this).removeClass();
                $(this).addClass("fas fa-sun"); 
                $(this).css("color", "orange");
            }
        });
    });
}

//this will clean out all the data on the page. We need to do this before we can add new data from our fetch() function
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

//this will test to see if we have errors. If none, it'll load the new data into our weather page
function handleErrors(response) {
    var city = localStorage.getItem('mostRecentSearch');
    if (!response.ok) {
        alert("Couldn't find");
    }else{
        if(isCurrentButton == false){
            saveRecentSearch(city);
        }
    }
    return response;
}

function fetchDataOnLoad(API_Key, city){
    let i = 0;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_Key}`;

    fetch(url)
    .then(response => response.json()) //json turns it into readable data
    .then(data => {
    //this loop sets the temp for each forecast date including today's date
        $(".temp").each(function(){
            i++;
            $(this).append(" " + data.list[i].main.temp + " °F");
        });
    //this loop sets the wind for each forecast date including today's date
        $(".wind").each(function(){
            i++;
            $(this).append(" " + data.list[i].wind.speed + " MPH");
        });
    //this loop sets the humidity for each forecast date including today's date
        $(".humidity").each(function(){
            i++;
            $(this).append(" " + data.list[i].main.humidity + " %");
        });
        $('i').each(function(){
            let desc = data.list[i].weather[0].description;
            if(desc.includes('clouds')){
                $(this).removeClass();
                $(this).addClass("fas fa-cloud");
                $(this).css("color", "gray");
            }else{
                $(this).removeClass();
                $(this).addClass("fa-solid fa-sun"); 
                $(this).css("color", "orange");
            }
        });
    });

}




