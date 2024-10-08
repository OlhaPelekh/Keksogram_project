function createThumbnail(element) {
  const template = document.querySelector("#picture").content.cloneNode(true);
  template.querySelector('.picture__img').setAttribute('data-id',element.id);
  template.querySelector(".picture__img").src = element.url;
  template.querySelector(".picture__comments").innerText = element.comments.length;
  template.querySelector(".picture__likes").innerText = element.likes;
  return template;
}

function createThumbnails(elements) {
  const fragment = document.createDocumentFragment();
  elements.forEach((temp) => {
    const thumbnail = createThumbnail(temp);
    fragment.appendChild(thumbnail);
  });
  return fragment;
}

export function showThumbnails(elements) {
  const pictures = document.querySelector(".pictures");

  const existingPictures = pictures.querySelectorAll(".picture");
  existingPictures.forEach((picture) => picture.remove());

  const thumbnails = createThumbnails(elements);
  pictures.appendChild(thumbnails);
}