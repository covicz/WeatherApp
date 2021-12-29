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
 

function showTemperature(response) {
   document.querySelector("#city").innerHTML = response.data.name;
   document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature)+`°C|°F`;
   document.querySelector("#humidity").innerHTML = `Humidity: `+ (response.data.main.humidity)+` %`;
   document.querySelector("#wind").innerHTML = 'Wind: '+ Math.round(response.data.wind.speed)+` km/h`;
   celsiusTemperature = response.data.main.temp;
   let icon = document.querySelector("#icon");
   icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
   

function search(event){
event.preventDefault();
let apiKey = "9b0cb71e79f417ebc7ae00e0534f9e30";
let city = document.querySelector("#search-city-input").value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}

function showFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature)+`°C|°F`;
}
function showCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature)+`°C|°F`;
}


let celsiusTemperature = null;

let form = document.querySelector("form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelsiusTemperature);















