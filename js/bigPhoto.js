function closeBigPicture() {
  document.querySelector(".big-picture").classList.toggle("hidden");
  document.querySelector("body").classList.toggle("modal-open");
  document.removeEventListener("keydown", closeBigPictureEsc);
}

function closeBigPictureEsc(evt) {
  if (evt.key === "Escape") {
    closeBigPicture();
  }
}

export function openBigPicture(element) {
  document.querySelector(".big-picture__img img").src = element.url;
  document.querySelector(".likes-count").innerText = element.likes;
  document.querySelector(".comments-count").innerText = element.comments.length;
  document.querySelector(".social__caption").innerText = element.description;

  const comments = document.querySelector(".social__comments");
  comments.innerHTML = "";
  element.comments.forEach((comment) => {
    const commentLi = document.createElement("li");
    commentLi.className = "social__comment";
    commentLi.innerHTML = `
     <img
       class="social__picture"
       src="${comment.avatar}"
       alt="${comment.name}"
       width="35" height="35">
     <p class="social__text">${comment.message}</p>
  `;
    comments.appendChild(commentLi);
  });
  document.querySelector(".big-picture").classList.toggle("hidden");

  document.querySelector(".social__comment-count").classList.add("hidden");

  document.querySelector("body").classList.toggle("modal-open");

  const bigPictureCancel = document
    .querySelector(".big-picture")
    .querySelector("#picture-cancel");
  bigPictureCancel.addEventListener("click", closeBigPicture);
  document.addEventListener("keydown", closeBigPictureEsc);
}
