const clockContainer = document.querySelector(".js-time");
const clockTitle = clockContainer.querySelector("h1");

function printTime(hours, minutes, seconds) {
  let amPm = "A.M.";
  if (hours > 12) {
    amPm = "P.M.";
    hours -= 12;
  }
  clockTitle.innerText = `${amPm} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  printTime(hours, minutes, seconds);
}

function init() {
  setInterval(getTime, 100);
}

init();
