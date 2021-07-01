//Select Elements
const hour = document.querySelector(".hr");
const minute = document.querySelector(".min");
const second = document.querySelector(".sec");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// weather app units
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// weather const and vars
const KELVIN = 273;

// API KEY
const key = "bf5b92f536d0a0e17eb17cfc44f2857c";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.country}`;
}

//DIGITAL CLOCK 
function clock(){

    const fullDate = new Date();
    var hours = fullDate.getHours();
    var minutes = fullDate.getMinutes();
    var seconds = fullDate.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    // change value of span tag to current hour, minutes and seconds
    document.getElementById('hour').innerHTML = `${hours}:`;
    document.getElementById('minute').innerHTML = `${minutes}:`;
    document.getElementById('second').innerHTML = `${seconds}`;

}

//ANALOG CLOCK
function analog(){
    const fullDate = new Date();
    var hours = fullDate.getHours();
    var minutes = fullDate.getMinutes();
    var seconds = fullDate.getSeconds();

    const hourDeg = (hours/12) * 360 -90;
    const minDeg = (minutes/60) * 360 - 90;
    const secDeg = (seconds/60) * 360 - 90;

    hour.style.transform = `rotate(${hourDeg}deg)`
    minute.style.transform = `rotate(${minDeg}deg)`
    second.style.transform = `rotate(${secDeg}deg)`
}

// CHANGES BACKGROUND COLOR ACCORDING TO TENNIS SEASON

var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var total = month;
switch(total) { 
    case(total >= 3 && total <= 5): //ROLAND GARROS
    var season = 'Brown';
    break
    case(total >= 6 && total <= 8): //WIMBLEDON
    var season = 'DarkGreen';
    break;
    case(total >= 9 && total <= 11): //US OPEN
    var season = 'DarkBlue';
    case(total == 12 || total == 1 || total == 2): //AUS OPEN
    var season = 'DarkCyan';
    default:
        var season = 'DarkGreen'

}
document.body.style.background = season;
console.log(total);

// UPDATE HR MIN SEC EVERY 1 MS
setInterval(clock,100);
setInterval(analog,100);