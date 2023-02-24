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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function cityWeather(city) {
  let apiKey = "t8c4bc88f33a8fff2c5o00a1f6b0d692";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeatherDetails);
  console.log(apiUrl);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  cityWeather(city);
}

function showWeatherDetails(response) {
  document.querySelector("h1").innerHTML = response.data.city;
  celsiusElement = response.data.temperature.current;
  console.log(celsiusElement);
  document.querySelector("#temp-value").innerHTML = Math.round(celsiusElement);
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  let description = document.querySelector("#short-description");
  description.innerHTML = response.data.condition.description;

  forecastCoordinates(response);
}

function forecastCoordinates(response) {
  let apiKey = "t8c4bc88f33a8fff2c5o00a1f6b0d692";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response.data.city}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);

  console.log(apiUrl);
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#upcoming-forecast");

  let forecast = response.data.daily;
  console.log(forecast);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-3">
          <span class="weather-symbol"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" /></span><br /><span
            class="forecast-min-temp"
            >${Math.round(forecastDay.temperature.minimum)} </span
          >/ <span class="forecast-max-temp">${Math.round(
            forecastDay.temperature.maximum
          )} </span><br />${formatDay(forecastDay.time)}
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusElement = null;

let enterCity = document.querySelector("#city-search");
enterCity.addEventListener("click", showCity);

cityWeather("Prague");
