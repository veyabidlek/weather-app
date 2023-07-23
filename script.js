let lat = null;
let long = null;
navigator.geolocation.getCurrentPosition(function (position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  lat = latitude;
  long = longitude;
  currentLocationWeather(latitude, longitude);
});

const apiKey = "381b31a1bff90d3e22c121cf38c96505";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const temp = document.querySelector(".temperature");
const background = document.querySelector(".background");
const errorContainer = document.querySelector(".error-container");
const body = document.body;
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search-field");
const searchBtn = document.querySelector(".btn-search");

const displayError = function () {
  background.classList.add("blur");
  errorContainer.classList.remove("hidden");
  body.addEventListener("click", removeError);
};

const removeError = function () {
  background.classList.remove("blur");
  errorContainer.classList.add("hidden");
  searchBox.value = "";
  if (lat !== null && long !== null) {
    currentLocationWeather(lat, long);
  }
  body.removeEventListener("click", removeError);
};

const displayWeather = function (data) {
  const city = document.querySelector(".city");
  city.innerHTML = data.name;
  city.classList.add("show");
  temp.innerHTML = `${Math.round(data.main.temp)}°C`;
  temp.classList.add("show");
  humidity.innerHTML = `${Math.round(data.main.humidity)}%`;
  humidity.classList.add("show");
  wind.innerHTML = `${Math.round(data.wind.speed)} km/h`;
  wind.classList.add("show");

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  }
};

async function currentLocationWeather(latitude, longitude) {
  console.log(latitude);
  console.log(longitude);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  );
  var data = await response.json();
  displayWeather(data);
}

async function searchWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  if (data.name == undefined) {
    displayError();
    return;
  }
  displayWeather(data);
}
searchBtn.addEventListener("click", () => {
  searchWeather(searchBox.value);
});
