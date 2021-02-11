const nameFormContainer = document.querySelector(".js-nameForm");
const nameFormInput = nameFormContainer.querySelector("input");
const greeting = document.querySelector(".js-greeting");
const greetingText = greeting.querySelector(".js-greeting__text");
const logoutBtn = greeting.querySelector("i");

const USER_NAME = "userName";

function handleLogout() {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(TODO_VALUE);
    window.location.reload();
  });
}

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
  greetingText.innerText = `Hello ${currentName}!`;
  greetingText.classList.add("show");
  logoutBtn.classList.add("show");
}

function loadName() {
  const currentName = localStorage.getItem(USER_NAME);
  if (currentName === null) {
    nameFormContainer.classList.add("show");
    logoutBtn.classList.remove("show");
    askName();
  } else {
    printName(currentName);
  }
}

function init() {
  loadName();
  handleLogout();
}

init();
