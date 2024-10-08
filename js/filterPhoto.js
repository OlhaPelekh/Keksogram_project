import { getRandomNumber } from "../js/random.js";
import { countElement } from "../js/constants.js";
import { getArray } from "../js/elements.js";
import { showThumbnails } from "../js/thumbnails.js";

// function debounce(func, delay) {
//   let timeout;
//   return function(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func.apply(this, args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, delay);
//   };
// }

const elements = getArray(countElement);

document
  .querySelector(".img-filters")
  .classList.remove("img-filters--inactive");
// document.querySelector('.img-filters__title ').classList.remove('visually-hidden');

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

//Варіант з reduce
// function getRandomPhotos(count, elements) {
//   let resultPhoto = [];
//   resultPhoto = Array(count).fill().reduce((resultPhoto)=>{
//     const id = getRandomNumber(photosCount.min, photosCount.max);
//     return resultPhoto.includes(elements[id]) ? resultPhoto : [...resultPhoto, elements[id]];
//   },[]);
//   return resultPhoto;
// }

function getPopularPhotos(elements) {
  const newArray = [...elements];
  newArray.sort((a, b) => b.comments.length - a.comments.length);
  return newArray;
}

export const handleFilterClick = _.debounce((evt) => {
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
}, 500);
