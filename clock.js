const clockContainer = document.querySelector(".js-time");
const clockDate = clockContainer.querySelector(".js-time__date");
const clockTitle = clockContainer.querySelector(".js-time__clock");

function printDate(year, month, day) {
  clockDate.innerText = `${year}.${month}.${day}`;
}

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
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  printDate(year, month, day);
  printTime(hours, minutes, seconds);
}

function init() {
  setInterval(getTime, 100);
}

init();
