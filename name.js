const nameFormContainer = document.querySelector(".js-nameForm");
const nameFormInput = nameFormContainer.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_NAME = "userName";

function saveName(currentValue) {
  localStorage.setItem(USER_NAME, currentValue);
}

function askName() {
  nameFormContainer.addEventListener("submit", (event) => {
    // console.log(nameFormInput.value);
    const currentValue = nameFormInput.value;
    event.preventDefault();
    saveName(currentValue);
    printName(currentValue);
    nameFormContainer.classList.remove("show");
    greeting.classList.add("show");
  });
}

function printName(currentName) {
  greeting.innerText = `Hello nice to meet you ${currentName}!`;
  greeting.classList.add("show");
}

function loadName() {
  const currentName = localStorage.getItem(USER_NAME);
  if (currentName === null) {
    nameFormContainer.classList.add("show");
    askName();
  } else {
    printName(currentName);
  }
}

function init() {
  loadName();
}

init();
