const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoListUncomplete = document.querySelector(".toDoList__toDo__list");
const toDoListComplete = document.querySelector(".toDoList__complete__list");
const countToDo = document.querySelector(".js-countToDo");

const TODO_VALUE = "toDos";
const TODO_COMPLETE = "toDosDone";

let toDos = [];
let toDosDone = [];

function paintCount(liCount, liCountComplete) {
  if (liCount === 0) {
    countToDo.innerText = "Nothing to do!!";
  } else if (liCount === liCountComplete) {
    countToDo.innerText = "All Clear Well done!!";
  } else {
    countToDo.innerText = `Completed : ${liCountComplete} / Total : ${liCount}`;
  }
}

function countToDoList() {
  const liUncomplete = toDoListUncomplete.querySelectorAll("li");
  const liComplete = toDoListComplete.querySelectorAll("li");

  const liCount = liUncomplete.length + liComplete.length;
  const liCountComplete = liComplete.length;

  paintCount(liCount, liCountComplete);
}

function returnToUncomplete(event) {
  const target = event.target;
  const li = target.parentNode.parentNode;

  if (toDosDone.length === 1) {
    paintToDoUncomplete(toDosDone[0].key, toDosDone[0].index);
  } else {
    const moveCompleteToDos = toDosDone.filter((todo) => {
      return todo.index === parseInt(li.id);
    });
    paintToDoUncomplete(moveCompleteToDos[0].key, moveCompleteToDos[0].index);
  }
}

function removeToDoComplete(event) {
  const target = event.target;
  const li = target.parentNode.parentNode;
  toDoListComplete.removeChild(li);

  const cleanToDos = toDosDone.filter((toDo) => {
    return toDo.index !== parseInt(li.id);
  });
  toDosDone = cleanToDos;
  saveToDoComplete();
  countToDoList();
}

function saveToDoComplete() {
  localStorage.setItem(TODO_COMPLETE, JSON.stringify(toDosDone));
}

function createLiCompleteTodo(key, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const buttonBefore = document.createElement("button");
  const buttonExit = document.createElement("button");

  span.innerText = `${key}`;
  buttonBefore.innerText = " 👈";
  buttonBefore.id = "button__before";
  buttonExit.innerText = "❌";
  buttonExit.id = "button__exit";

  li.appendChild(span);
  li.appendChild(div);
  div.appendChild(buttonBefore);
  div.appendChild(buttonExit);
  li.id = index;

  buttonExit.addEventListener("click", removeToDoComplete);
  buttonBefore.addEventListener("click", returnToUncomplete);
  buttonBefore.addEventListener("click", removeToDoComplete);

  return li;
}

function paintToDoComplete(key, index) {
  const CompleteToDoList = createLiCompleteTodo(key, index);
  newToDo = {
    index,
    key,
  };

  toDoListComplete.appendChild(CompleteToDoList);
  toDosDone.push(newToDo);
  saveToDoComplete();
}

function completeToDo(event) {
  const target = event.target;
  const buttonContainer = target.parentNode;
  const li = buttonContainer.parentNode;
  const moveToDos = toDos.filter((toDo) => {
    return toDo.index === parseInt(li.id);
  });
  // console.log(moveToDos[0].index);
  paintToDoComplete(moveToDos[0].key, moveToDos[0].index);
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
  countToDoList();
}

function saveToDo() {
  localStorage.setItem(TODO_VALUE, JSON.stringify(toDos));
}

function createLiUncompleteTodo(key, index) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");
  const buttonComplete = document.createElement("button");
  const buttonExit = document.createElement("button");

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

  buttonExit.addEventListener("click", removeToDo);
  buttonComplete.addEventListener("click", completeToDo);
  buttonComplete.addEventListener("click", removeToDo);

  return li;
}

function paintToDoUncomplete(key, index) {
  const UncompleteToDoList = createLiUncompleteTodo(key, index);
  newToDo = {
    index,
    key,
  };

  toDoListUncomplete.appendChild(UncompleteToDoList);
  toDos.push(newToDo);
  // console.log(toDos);
  saveToDo();
}

function loadToDo() {
  const currentToDo = localStorage.getItem(TODO_VALUE);
  const parsedToDo = JSON.parse(currentToDo);

  const currentCompleteToDo = localStorage.getItem(TODO_COMPLETE);
  const parsedCompleteToDo = JSON.parse(currentCompleteToDo);

  // console.log(parsedToDo);
  if (currentToDo !== null) {
    parsedToDo.forEach((toDos) => {
      paintToDoUncomplete(toDos.key, toDos.index);
    });
  }

  if (currentCompleteToDo !== null) {
    parsedCompleteToDo.forEach((toDos) => {
      paintToDoComplete(toDos.key, toDos.index);
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
    paintToDoUncomplete(toDoValue, Date.now());
    countToDoList();
  });
  countToDoList();
}

init();
