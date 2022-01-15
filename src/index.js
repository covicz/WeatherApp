let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10){
    hours = `0${hours}`;
    }
let minutes = now.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`;
}
let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"]
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`

function formatDay(timestamp){
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
let days =["Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat"];
  return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if(index<6){
    forecastHTML = forecastHTML + `
            <div class="col-2">
              <div class="weather-days">${formatDay(forecastDay.dt)}</div>
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="40" />
              <div class="temp-days">
                <span class="temp-days-max"> ${Math.round(forecastDay.temp.max)}° /</span>
                <span class="temp-days-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
            </div>
          `;
    }
  });
  forecastHTML = forecastHTML+`</div>`;        
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
  let apiKey = "9b0cb71e79f417ebc7ae00e0534f9e30";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}
  

function showTemperature(response) {
   document.querySelector("#city").innerHTML = response.data.name;
   celsiusTemperature = response.data.main.temp;
   document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
   document.querySelector("#humidity").innerHTML = `Humidity: `+ (response.data.main.humidity)+` %`;
   document.querySelector("#wind").innerHTML = 'Wind: '+ Math.round(response.data.wind.speed)+` km/h`;
   
   let icon = document.querySelector("#icon");
   icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 getForecast(response.data.coord);
}
   

function search(event){
event.preventDefault();
let apiKey = "9b0cb71e79f417ebc7ae00e0534f9e30";
let city = document.querySelector("#search-city-input").value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
 
}

let form = document.querySelector("form");
form.addEventListener("submit", search);





















