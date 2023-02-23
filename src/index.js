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

function cityWeather(city) {
  let apiKey = "04bde8cc7f569f7c5603cdbc6deb89a3";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherDeatails);
  console.log(apiUrl);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  cityWeather(city);
}

function showWeatherDeatails(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusElement = response.data.main.temp;
  document.querySelector("#temp-value").innerHTML = Math.round(celsiusElement);
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

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

  forecastCoordinates(response.data);
}

function displayFahrenheit(event) {
  event.preventDefault();

  let mainTemperature = document.querySelector("#temp-value");
  let fahrenheitElement = (celsiusElement * 9) / 5 + 32;
  mainTemperature.innerHTML = Math.round(fahrenheitElement);
}

function displayCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#temp-value");
  mainTemperature.innerHTML = Math.round(celsiusElement);
}

function forecastCoordinates(response) {
  let apiKey = "t8c4bc88f33a8fff2c5o00a1f6b0d692";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response.name}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);

  console.log(apiUrl);
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#upcoming-forecast");

  let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col">
          <span class="weather-symbol">🌥️</span><br /><span
            class="forecast-min-temp"
            >-3 </span
          >/ <span class="forecast-max-temp">-11 </span><br />${day}
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let enterCity = document.querySelector("#city-search");
enterCity.addEventListener("click", showCity);

let celsiusElement = null;

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", displayFahrenheit);

let temperatureCelsius = document.querySelector("#celsius");
temperatureCelsius.addEventListener("click", displayCelsius);

cityWeather("Prague");
