const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const TODO_VALUE = "toDo";
let toDo = [];

function removeToDo(event) {
  const target = event.target;
  const li = target.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDo.filter((todo) => {
    return todo.index !== parseInt(li.id);
  });
  toDo = cleanToDos;
  saveToDo(toDo);
}

function saveToDo(toDo) {
  localStorage.setItem(TODO_VALUE, JSON.stringify(toDo));
}

function paintToDo(currentToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const index = Date.now();
  newToDo = {
    index: index,
    key: currentToDo,
  };
  span.innerText = `${currentToDo}`;
  button.innerText = "❌";
  li.appendChild(span);
  li.appendChild(button);
  li.id = index;
  toDoList.appendChild(li);
  toDo.push(newToDo);
  // console.log(toDo);
  saveToDo(toDo);
  button.addEventListener("click", removeToDo);
}

function loadToDo() {
  const currentToDo = localStorage.getItem(TODO_VALUE);
  const parsedToDo = JSON.parse(currentToDo);
  console.log(parsedToDo);
  if (currentToDo !== null) {
    parsedToDo.forEach((toDo) => {
      paintToDo(toDo.key);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const toDoValue = toDoInput.value;
    // console.log(toDoValue);
    toDoInput.value = "";
    paintToDo(toDoValue);
  });
}

init();
