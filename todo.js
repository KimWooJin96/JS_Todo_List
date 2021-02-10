const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const TODO_VALUE = "toDos";
let toDos = [];

function removeToDo(event) {
  const target = event.target;
  const li = target.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter((toDo) => {
    return toDo.index !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
}

function saveToDo() {
  localStorage.setItem(TODO_VALUE, JSON.stringify(toDos));
}

function paintToDoInitial(currentToDo) {
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
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
  button.addEventListener("click", removeToDo);
}

function paintToDoSaved(key, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  newToDo = {
    index,
    key,
  };
  span.innerText = `${key}`;
  button.innerText = "❌";
  li.appendChild(span);
  li.appendChild(button);
  li.id = index;
  toDoList.appendChild(li);
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
  button.addEventListener("click", removeToDo);
}

function loadToDo() {
  const currentToDo = localStorage.getItem(TODO_VALUE);
  const parsedToDo = JSON.parse(currentToDo);
  // console.log(parsedToDo);
  if (currentToDo !== null) {
    parsedToDo.forEach((toDos) => {
      paintToDoSaved(toDos.key, toDos.index);
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
    paintToDoInitial(toDoValue);
  });
}

init();
