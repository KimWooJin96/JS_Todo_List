const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoListUncomplete = document.querySelector(".toDoList__toDo__list");
const toDoListComplete = document.querySelector(".toDoList__complete__list");

const TODO_VALUE = "toDos";
const TODO_COMPLETE = "toDosDone";
let toDos = [];
let toDosDone = [];

function countToDo() {
  const liUncomplete = toDoListUncomplete.querySelectorAll("li");
  const liComplete = toDoListComplete.querySelectorAll("li");
  const countToDo = document.querySelector(".js-countToDo");
  const liCount = liUncomplete.length + liComplete.length;
  const liCountComplete = liComplete.length;
  if (liCount === 0) {
    countToDo.innerText = "Nothing to do!!";
  } else if (liCount === liCountComplete) {
    countToDo.innerText = "Clear Well done!!";
  } else {
    countToDo.innerText = `Completed : ${liCountComplete} / Total : ${liCount}`;
  }
}

function removeToDoComplete(event) {
  const target = event.target;
  const li = target.parentNode;
  toDoListComplete.removeChild(li);

  const cleanToDos = toDosDone.filter((toDo) => {
    return toDo.index !== parseInt(li.id);
  });
  toDosDone = cleanToDos;
  saveToDoComplete();
  countToDo();
}

function completeToDo(event) {
  const target = event.target;
  const buttonContainer = target.parentNode;
  const li = buttonContainer.parentNode;
  const moveToDos = toDos.filter((toDo) => {
    return toDo.index === parseInt(li.id);
  });
  // console.log(moveToDos[0].index);
  paintToDoComplete(moveToDos);
}

function saveToDoComplete() {
  localStorage.setItem(TODO_COMPLETE, JSON.stringify(toDosDone));
}

function paintToDoCompleteSaved(key, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const buttonExit = document.createElement("button");
  newToDo = {
    index,
    key,
  };
  span.innerText = `${key}`;
  buttonExit.innerText = "❌";
  buttonExit.id = "button__exit";
  li.appendChild(span);
  li.appendChild(buttonExit);
  li.id = index;
  toDoListComplete.appendChild(li);
  toDosDone.push(newToDo);
  // console.log(toDos);
  saveToDoComplete();
  buttonExit.addEventListener("click", removeToDoComplete);
}

function paintToDoComplete(moveToDos) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const buttonExit = document.createElement("button");
  const index = moveToDos[0].index;
  newToDo = {
    index: index,
    key: moveToDos[0].key,
  };
  span.innerText = `${moveToDos[0].key}`;
  buttonExit.innerText = "❌";
  buttonExit.id = "button__exit";
  li.appendChild(span);
  li.appendChild(buttonExit);
  li.id = index;
  toDoListComplete.appendChild(li);
  toDosDone.push(newToDo);
  // console.log(toDosDone);
  saveToDoComplete();
  buttonExit.addEventListener("click", removeToDoComplete);
}

function removeToDo(event) {
  const target = event.target;
  const buttonContainer = target.parentNode;
  const li = buttonContainer.parentNode;
  toDoListUncomplete.removeChild(li);

  const cleanToDos = toDos.filter((toDo) => {
    return toDo.index !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDo();
  countToDo();
}

function saveToDo() {
  localStorage.setItem(TODO_VALUE, JSON.stringify(toDos));
}

function paintToDoSaved(key, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const buttonComplete = document.createElement("button");
  const buttonExit = document.createElement("button");
  newToDo = {
    index,
    key,
  };
  span.innerText = `${key}`;
  buttonComplete.innerText = "✔️";
  buttonComplete.id = "button__complete";
  buttonExit.innerText = "❌";
  buttonExit.id = "button__exit";
  li.appendChild(span);
  li.appendChild(div);
  div.appendChild(buttonComplete);
  div.appendChild(buttonExit);
  div.id = "buttonContainer";
  li.id = index;
  toDoListUncomplete.appendChild(li);
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
  buttonExit.addEventListener("click", removeToDo);
  buttonComplete.addEventListener("click", completeToDo);
  buttonComplete.addEventListener("click", removeToDo);
}

function paintToDoInitial(currentToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const buttonComplete = document.createElement("button");
  const buttonExit = document.createElement("button");
  const index = Date.now();
  newToDo = {
    index: index,
    key: currentToDo,
  };
  span.innerText = `${currentToDo}`;
  buttonComplete.innerText = "✔️";
  buttonComplete.id = "button__complete";
  buttonExit.innerText = "❌";
  buttonExit.id = "button__exit";
  li.appendChild(span);
  li.appendChild(buttonComplete);
  li.appendChild(div);
  div.appendChild(buttonComplete);
  div.appendChild(buttonExit);
  div.id = "buttonContainer";
  li.id = index;
  toDoListUncomplete.appendChild(li);
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
  buttonExit.addEventListener("click", removeToDo);
  buttonComplete.addEventListener("click", completeToDo);
  buttonComplete.addEventListener("click", removeToDo);
}

function loadToDo() {
  const currentToDo = localStorage.getItem(TODO_VALUE);
  const parsedToDo = JSON.parse(currentToDo);

  const currentCompleteToDo = localStorage.getItem(TODO_COMPLETE);
  const parsedCompleteToDo = JSON.parse(currentCompleteToDo);

  // console.log(parsedToDo);
  if (currentToDo !== null) {
    parsedToDo.forEach((toDos) => {
      paintToDoSaved(toDos.key, toDos.index);
    });
  }

  if (currentCompleteToDo !== null) {
    parsedCompleteToDo.forEach((toDos) => {
      paintToDoCompleteSaved(toDos.key, toDos.index);
      console.log(toDos.key, toDos.index);
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
    countToDo();
  });
  countToDo();
}

init();
