let now = new Date();
let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let todayDate = document.querySelector("#current-date");
let nowTime = document.querySelector("#current-time");
let currentDay = now.getDate();
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
todayDate.innerHTML = `${currentDay}.${currentMonth}.${currentYear}.`;
nowTime.innerHTML = `${currentHour}:${currentMinutes}`;

function weatherInformation(response) {
  let temperatureValue = document.querySelector("#temp-value");
  temperatureValue.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#temp-max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let description = document.querySelector("#short-description");
  description.innerHTML = response.data.weather[0].description;
}

let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=prague&units=metric&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(weatherInformation);

/*function cityWeather(city) {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherDeatails);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  cityWeather(city);
}

function showWeatherDeatails(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
}

function myLocation(position) {
  console.log(position.coords);
}

let enterCity = document.querySelector("#city-search");
enterCity.addEventListener("click", showCity);

/*let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click")*/

/*navigator.geolocation.getCurrentPosition(myLocation);*/
