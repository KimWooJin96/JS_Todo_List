const nameFormContainer = document.querySelector(".js-nameForm");
const nameFormInput = nameFormContainer.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_NAME = "userName";

function saveName(currentNameValue) {
  localStorage.setItem(USER_NAME, currentNameValue);
}

function askName() {
  nameFormContainer.addEventListener("submit", (event) => {
    // console.log(nameFormInput.value);
    const currentNameValue = nameFormInput.value;
    event.preventDefault();
    saveName(currentNameValue);
    printName(currentNameValue);
    nameFormContainer.classList.remove("show");
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
