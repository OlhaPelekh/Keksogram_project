function createThumbnail(element) {
  const template = document.querySelector("#picture").content.cloneNode(true);
  template.querySelector(".picture__img").src = element.url;
  template.querySelector(".picture__comments").innerText = element.comments.length;
  template.querySelector(".picture__likes").innerText = element.likes;
  return template;
}

export function createThumbnails(elements) {
  const fragment = document.createDocumentFragment();
  elements.forEach((temp) => {
    const thumbnail = createThumbnail(temp);
    fragment.appendChild(thumbnail);
  });
  return fragment;
}
