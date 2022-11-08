
const API_Key = "b9484f46952004ac40fe78867828c4ee";

let dayOfMonth = parseInt(moment().format("DD"));
let todaysDay = moment().date(dayOfMonth).format("M/D/YYYY");

let h1 = $("#current").children("h1").text(todaysDay);

let buttonsArray = [];
let safeSearch;
//console.log(buttonsArray);


//-----------FUNCTIONS---------------
//this function 
$('.day').each(function(){
    dayOfMonth++;
    $(this).text(moment().date(dayOfMonth).format("M/D/YYYY"));

});

//this function will set the value of city and then run fetchData()
$("#searchBtn").on('click', function(){
    safeSearch = true;
    city = $(".inputValue").val();
    if(city != null)
    {
        $('.inputValue').val('');

        localStorage.setItem('mostRecentSearch', city);
    
        wipeData();
        fetchData(API_Key, city);
        saveRecentSearch(city);
        loadRecentSearches();   
    }
});

//on load, reload the recentSearches container
$(window).on( "load", function() { 
    buttonsArray = [];
    loadRecentSearches();
});

//this function will search for weather data based on city clicked
function search(){
    wipeData();
    city = $(this).val();
    fetchData(API_Key, city);
}

function saveRecentSearch(recentSearch){
    console.log(safeSearch);
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
}

function loadRecentSearches(){
    $('.searchHistory').empty();
    let citiesArray = JSON.parse(localStorage.getItem('recentSearches'));
    
    if(citiesArray != null){
        for(var city of citiesArray){
            var recentSearch = document.createElement('input');
            recentSearch.type = "submit";
            recentSearch.className = "button";
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
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&exclude=minutely,hourly,alerts&appid=${API_Key}`;

    fetch(url)
    .then(handleErrors)
    .then(response => response.json())
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
    var city = localStorage.getItem('mostRecentSearch');
    if (!response.ok) {
        safeSearch = false;
        alert("Couldn't find");
    }
    return response;
}




