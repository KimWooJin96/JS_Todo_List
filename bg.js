const body = document.querySelector("body");

const IMG_NUM = 5;

function applyImage(randomNum) {
  const image = new Image();
  image.src = `https://user-images.githubusercontent.com/62231339/107779774-2a25ce80-6d89-11eb-8b91-63f4f189e9e8.jpg`;
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
