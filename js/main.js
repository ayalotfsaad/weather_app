
// stying
let btnToggler = document.getElementById('toggle')
let sideMenu = document.getElementById('sideMenu');

btnToggler.addEventListener("click", function () {
    sideMenu.classList.toggle('hide')
})


// responsive 

let today = document.getElementById('today');
let day = document.getElementById('day');
let dayNum = document.getElementById('dayNum')
let locationCity = document.getElementById('location');
let temp = document.getElementById('temp');
let forcastIcone = document.getElementById('forcastIcone');
let text = document.getElementById('text');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDir = document.getElementById('windDir');


// next day 
let nextDay = document.getElementsByClassName('day');
let nextDayIcon = document.getElementsByClassName('icon-img');
let maxtemp = document.getElementsByClassName('maxtemp');
let mintemp = document.getElementsByClassName('mintemp');
let nextDaytext = document.getElementsByClassName('nextDaytext');


// search 
let searchInput = document.getElementById('search')



// get api 

async function getApi(cityName) {
    let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9e217eea803c4c058ae215425240401&q=${cityName}&days=3&aqi=no&alerts=no`)
    let response = await url.json()
    return response

}



// dispay today 

function display(data) {
    let dateNow = new Date();
    today.innerHTML = dateNow.toLocaleDateString("en-us", { weekday: "long" })
    day.innerHTML = dateNow.getDate();
    dayNum.innerHTML = dateNow.toLocaleDateString("en-us", { month: "long" })
    locationCity.innerHTML = data.location.name
    temp.innerHTML = data.current.temp_c
    forcastIcone.setAttribute("src", "http:" + data.current.condition.icon)
    text.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDir.innerHTML = data.current.wind_dir

}



// dispay nextday
function displayNextday(data) {

    let forcasetdata = data.forecast.forecastday

    for (let i = 0; i < 2; i++) {
        let dateNow = new Date(forcasetdata[i + 1].date);
        nextDay[i].innerHTML = dateNow.toLocaleDateString("en-us", { weekday: "long" })
        maxtemp[i].innerHTML = forcasetdata[i + 1].day.maxtemp_c
        mintemp[i].innerHTML = forcasetdata[i + 1].day.mintemp_c
        nextDaytext[i].innerHTML = forcasetdata[i + 1].day.condition.text
        nextDayIcon[i].setAttribute("src", "http:" + forcasetdata[i + 1].day.condition.icon)
    }
}


// final function 

async function finaly(city="cairo") {
    let weatherApi = await getApi(city);
    if(!weatherApi.error){
        display(weatherApi)
        displayNextday(weatherApi)
    }

}
finaly()


searchInput.addEventListener("input",function(){
  
   finaly(searchInput.value)
})