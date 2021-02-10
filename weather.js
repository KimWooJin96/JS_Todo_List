const weather = document.querySelector(".js-weather");
const currentTemp = weather.querySelector(".js-weather__currentTemp");
const maxMinTemp = weather.querySelector(".js-weather__maxMinTemp");

const API_KEY = "1ad1c88cb63426f2c04acd22790476df";
const COORD = "coordinates";

function getWeathers(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      const cityName = json.name;
      const temp = json.main.temp;
      const tempMax = json.main.temp_max;
      const tempMin = json.main.temp_min;
      currentTemp.innerText = `${cityName}'s current temperature : ${temp}`;
      maxMinTemp.innerText = `Today's maximum temperature : ${tempMax} minimum temperature : ${tempMin}`;
    });
}

function saveCoords(coordObj) {
  localStorage.setItem(COORD, JSON.stringify(coordObj));
}

function handleGeoSuccess(location) {
  // console.log(location);
  const latitude = location.coords.latitude;
  const longitude = location.coords.longitude;
  const coordObj = {
    latitude,
    longitude,
  };
  saveCoords(coordObj);
  getWeathers(coordObj.latitude, coordObj.longitude);
}

function handleGeoError(location) {
  console.log("can't load your location!!");
}

function getCoords() {
  window.navigator.geolocation.getCurrentPosition(
    handleGeoSuccess,
    handleGeoError
  );
}

function loadWeather() {
  const currentCoords = localStorage.getItem(COORD);
  if (currentCoords === null) {
    getCoords();
  } else {
    const parsedCoords = JSON.parse(currentCoords);
    getWeathers(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadWeather();
}

init();
