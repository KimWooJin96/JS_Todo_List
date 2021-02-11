const body = document.querySelector("body");

const IMG_NUM = 5;

function applyImage(randomNum) {
  const image = new Image();
  image.src = `/images/${randomNum + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function getRandom() {
  const num = Math.floor(Math.random() * IMG_NUM);
  return num;
}

function init() {
  const randomNum = getRandom();
  applyImage(randomNum);
}

init();
