import { getArray } from "../js/elements.js";
import { createThumbnails } from "../js/thumbnails.js";
import { openBigPicture } from "../js/bigPhoto.js";
import { events } from "../js/validation.js";
import { changeImageScale, changeImageEffect } from "./stylePhoto.js";
import { getRandomNumber } from "../js/random.js";

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

document
  .querySelector(".img-filters")
  .classList.remove("img-filters--inactive");
// document.querySelector('.img-filters__title ').classList.remove('visually-hidden');

const countElement = 25;
// let elements = [];

const elements = getArray(countElement);
console.log(elements);

function showThumbnails(elements) {
  const pictures = document.querySelector(".pictures");

  const existingPictures = pictures.querySelectorAll(".picture");
  existingPictures.forEach((picture) => picture.remove());

  const thumbnails = createThumbnails(elements);
  pictures.appendChild(thumbnails);
}

const photosCount = {
  min: 0,
  max: countElement - 1,
};
function getRandomPhotos(count, elements) {
  let resultPhoto = [];
  while (resultPhoto.length < count) {
    const id = getRandomNumber(photosCount.min, photosCount.max);
    if (!resultPhoto.includes(elements[id])) {
      resultPhoto.push(elements[id]);
    }
  }
  return resultPhoto;
}

function getPopularPhotos(elements) {
  elements.sort((a,b) => b.comments.length - a.comments.length);
  return elements;
}

showThumbnails(elements);

const parentFilters = document.querySelector(".img-filters");
const handleFilterClick = debounce((evt) => {
// parentFilters.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("img-filters__button")) {
    const filterButtons = document.querySelectorAll(".img-filters__button");
    filterButtons.forEach((button) =>
      button.classList.remove("img-filters__button--active")
    );
    evt.target.classList.add("img-filters__button--active");
    let tempArray = [];
    const className = evt.target.id;
    switch (className) {
      case "filter-random":
        tempArray = getRandomPhotos(10, elements);
        showThumbnails(tempArray);
        break;
      case "filter-discussed":
        tempArray = getPopularPhotos(elements);
        showThumbnails(tempArray);
        break;
      default:
        showThumbnails(elements);
        break;
    }
  }
},500);

parentFilters.addEventListener("click", handleFilterClick);

const parentElement = document.querySelector(".pictures");
parentElement.addEventListener("click", (evt) => {
  const id = +evt.target.dataset.id;
  const selectedElements = elements.find((element) => element.id === id);
  openBigPicture(selectedElements);
});

events();

changeImageScale();
changeImageEffect();
