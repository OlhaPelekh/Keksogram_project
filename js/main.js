import { getArray } from "../js/elements.js";
import { showThumbnails } from "../js/thumbnails.js";
import { openBigPicture } from "../js/bigPhoto.js";
import { events } from "../js/validation.js";
import { changeImageScale, changeImageEffect } from "./stylePhoto.js";
import { handleFilterClick } from "../js/filterPhoto.js";
import {countElement} from "../js/constants.js"

const elements = getArray(countElement);
console.log(elements);

showThumbnails(elements);

const parentFilters = document.querySelector(".img-filters");
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
