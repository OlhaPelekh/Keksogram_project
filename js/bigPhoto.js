function closeBigPicture() {
  document.querySelector(".big-picture").classList.toggle("hidden");
  document.querySelector("body").classList.toggle("modal-open");
  document.removeEventListener("keydown", closeBigPictureEsc);
  document.querySelector(".comments-loader").removeEventListener("click", () => {
    renderComments(element.comments);
  });
}

function closeBigPictureEsc(evt) {
  if (evt.key === "Escape") {
    closeBigPicture();
  }
}

let visibleCommentsCount = 0;
const maxComment = 5;

function renderComments(commentsArray) {
  const comments = document.querySelector(".social__comments");
  const fragment = document.createDocumentFragment();

  const newComments = commentsArray.slice(
    visibleCommentsCount,
    visibleCommentsCount + maxComment
  );

  newComments.forEach((comment) => {
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
    fragment.appendChild(commentLi);
  });

  comments.appendChild(fragment);

  visibleCommentsCount += newComments.length;

  document.querySelector(
    ".social__comment-count"
  ).innerHTML = `${visibleCommentsCount} з ${commentsArray.length} коментарів`;

  if (visibleCommentsCount >= commentsArray.length) {
    document.querySelector(".comments-loader").classList.add("hidden");
  }
}

function toggleCommentsLoader(isVisible) {
  const loader = document.querySelector(".comments-loader");
  if (isVisible) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

export function openBigPicture(element) {
  document.querySelector(".big-picture__img img").src = element.url;
  document.querySelector(".likes-count").innerText = element.likes;
  document.querySelector(".picture__comments").innerText = element.comments.length;
  document.querySelector(".social__caption").innerText = element.description;

  const comments = document.querySelector(".social__comments");
  comments.innerHTML = "";

  visibleCommentsCount = 0;

  if (element.comments.length ===0) {
    comments.innerHTML = "<p>Коментарів ще немає</p>";
  } else {
    renderComments(element.comments);
  }

  if (element.comments.length <= maxComment) {
    document.querySelector(".social__comment-count").innerHTML = '';
  }

  toggleCommentsLoader(element.comments.length > visibleCommentsCount);

  document.querySelector(".comments-loader").addEventListener("click", () => {
    renderComments(element.comments);
  });

  document.querySelector(".big-picture").classList.toggle("hidden");
  document.querySelector("body").classList.toggle("modal-open");

  const bigPictureCancel = document.querySelector("#picture-cancel");
  bigPictureCancel.addEventListener("click", closeBigPicture);
  document.addEventListener("keydown", closeBigPictureEsc);
}
