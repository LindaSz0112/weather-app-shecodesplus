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

function searchCity(city) {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let citySearchField = document.querySelector("#city-input");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = citySearchField.value;
  searchCity(citySearchField.value);
}

function showTemperature(response) {
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
}

function myLocation(position) {
  console.log(position.coords);
}

let weather = document.querySelector("#go-button");
weather.addEventListener("click", showCity);

/*let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click")*/

navigator.geolocation.getCurrentPosition(myLocation);
