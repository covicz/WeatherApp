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
   document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp)+`°C Today`;
   document.querySelector("#humidity").innerHTML = `Humidity: `+ (response.data.main.humidity)+` %`;
   document.querySelector("#wind").innerHTML = 'Wind: '+ Math.round(response.data.wind.speed)+` km/h`;
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


















