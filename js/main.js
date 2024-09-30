import { getArray } from "../js/elements.js";
import { createThumbnails } from "../js/thumbnails.js";
import { openBigPicture } from "../js/bigPhoto.js";

const countElement = 25;

const elements = getArray(countElement);
console.log(elements);

function showThumbnails(elements) {
  const pictures = document.querySelector(".pictures");
  const thumbnails = createThumbnails(elements);
  pictures.appendChild(thumbnails);
}

showThumbnails(elements);


const parentElement = document.querySelector(".pictures");
parentElement.addEventListener("click", (evt) => {
    const id = +evt.target.dataset.id;
    const selectedElements = elements.find((element) => element.id === id);
    openBigPicture(selectedElements);
});
