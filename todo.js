const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const TO_DO = "toDoList";
const toDo = [];

function saveToDo(toDo) {
  localStorage.setItem(TO_DO, JSON.stringify(toDo));
}

function printToDo(currentToDoValue) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  let newId = Date.now();
  const toDoObject = {
    key: currentToDoValue,
    index: newId,
  };
  span.innerText = `${currentToDoValue}`;
  button.innerText = "❌";
  li.appendChild(span);
  li.appendChild(button);
  li.id = newId;
  toDoList.appendChild(li);
  toDo.push(toDoObject);
  saveToDo(toDo);
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(TO_DO);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach((todo) => {
      printToDo(todo.key);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentToDoValue = toDoInput.value;
    // console.log(currentToDoValue);
    printToDo(currentToDoValue);
    toDoInput.value = "";
  });
}

init();
