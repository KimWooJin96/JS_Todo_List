const body = document.querySelector("body");

const first =
  "https://user-images.githubusercontent.com/62231339/107778947-0910ae00-6d88-11eb-8067-ae8238278898.jpg";
const second =
  "https://user-images.githubusercontent.com/62231339/107778953-0d3ccb80-6d88-11eb-8360-a4f3050bfb20.jpg";
const third =
  "https://user-images.githubusercontent.com/62231339/107778963-1037bc00-6d88-11eb-8e51-0955a909b533.jpg";
const fourth =
  "https://user-images.githubusercontent.com/62231339/107778967-12017f80-6d88-11eb-86ad-2360aee5112a.jpg";
const fifth =
  "https://user-images.githubusercontent.com/62231339/107778983-16c63380-6d88-11eb-948b-0ca59ef83eaa.jpg";

const IMG_NUM = 5;

function applyImage(randomNum) {
  let imageSite = 1;
  switch (randomNum) {
    case 1:
      imageSite = first;
      break;
    case 2:
      imageSite = second;
      break;
    case 3:
      imageSite = third;
      break;
    case 4:
      imageSite = fourth;
      break;
    default:
      imageSite = fifth;
      break;
  }

  const image = new Image();
  image.src = `${imageSite}`;
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
